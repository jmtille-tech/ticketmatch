import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const EDITABLE_FIELDS = [
  "desc", "tags", "bureau_france", "bureau_europe", "support_france",
  "support_europe", "support_24/7", "langues_support", "paiement_integre",
  "caisse_certifiee", "bornes_billet", "cashless", "vente_sur_place",
  "bornes_fb", "controle_acces", "tarification_dynamique", "gestion_groupes",
  "gestion_cse", "crm_integre", "integration_logiciels", "pass_culture",
  "otas", "modele_prix", "vente_en_ligne", "multidevise", "plan_de_salle",
  "rgpd_conforme", "serveur_europe", "api_ouverte", "compte_demo",
  "langues_solution", "solution_fb_native", "solution_fb_integre",
  "chorus_pro_integre", "secteur_principal", "secteurs_secondaires",
  "jauge_min", "jauge_max", "references_verticales",
];

function generateToken(id: string): string {
  const secret = process.env.OPERATOR_EDIT_SECRET || "ticketmatch-secret";
  return Buffer.from(`${id}:${secret}`).toString("base64url");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, token, fields } = body;
    if (!id || !token || !fields) {
      return NextResponse.json({ error: "Parametres manquants" }, { status: 400 });
    }
    const expectedToken = generateToken(String(id));
    if (token !== expectedToken) {
      return NextResponse.json({ error: "Token invalide" }, { status: 403 });
    }
    const safeFields: Record<string, any> = {};
    for (const key of Object.keys(fields)) {
      if (EDITABLE_FIELDS.includes(key)) safeFields[key] = fields[key];
    }
    if (Object.keys(safeFields).length === 0) {
      return NextResponse.json({ error: "Aucun champ valide" }, { status: 400 });
    }
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { error } = await supabaseAdmin.from("solutions").update(safeFields).eq("id", id);
    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Erreur base de donnees" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const adminKey = url.searchParams.get("key");
  if (adminKey !== process.env.OPERATOR_EDIT_SECRET) {
    return NextResponse.json({ error: "Non autorise" }, { status: 403 });
  }
  if (!id) return NextResponse.json({ error: "id requis" }, { status: 400 });
  const token = generateToken(id);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ticketmatch-two.vercel.app";
  return NextResponse.json({ id, token, link: `${baseUrl}/operateur/${id}?token=${token}` });
}
