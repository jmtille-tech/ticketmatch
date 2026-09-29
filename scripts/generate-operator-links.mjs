/**
 * Générateur de liens sécurisés pour les opérateurs TicketMatch
 * Usage : node scripts/generate-operator-links.mjs
 *
 * Nécessite : OPERATOR_EDIT_SECRET dans .env.local
 * Résultat   : affiche les liens pour tous les opérateurs, ou pour un id précis
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync } from "fs";

// Charge .env.local
try {
  const env = readFileSync(".env.local", "utf8");
  env.split("\n").forEach((line) => {
    const [k, ...v] = line.split("=");
    if (k && v.length) process.env[k.trim()] = v.join("=").trim();
  });
} catch {}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SECRET      = process.env.OPERATOR_EDIT_SECRET || "ticketmatch-secret";
const SITE_URL    = process.env.NEXT_PUBLIC_SITE_URL || "https://ticketmatch-two.vercel.app";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Variables manquantes : NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requises");
  process.exit(1);
}

function generateToken(id) {
  return Buffer.from(`${id}:${SECRET}`).toString("base64url");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const targetId = process.argv[2]; // optionnel : node generate-operator-links.mjs 43

async function main() {
  let query = supabase.from("solutions").select("id, name").order("name");
  if (targetId) query = query.eq("id", targetId);

  const { data, error } = await query;
  if (error) { console.error("Erreur Supabase :", error.message); process.exit(1); }

  console.log("\n🎟️  Liens TicketMatch — validation des fiches opérateurs\n");
  console.log("─".repeat(80));

  for (const op of data) {
    const token = generateToken(op.id);
    const link  = `${SITE_URL}/operateur/${op.id}?token=${token}`;
    console.log(`\n📋 ${op.name} (id: ${op.id})`);
    console.log(`   ${link}`);
  }

  console.log("\n" + "─".repeat(80));
  console.log(`\n✅ ${data.length} lien(s) généré(s)\n`);
}

main();
