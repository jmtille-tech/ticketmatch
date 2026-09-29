"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

const FIELD_GROUPS: {
  label: string;
  fields: { key: string; label: string; type: "bool" | "text" | "number" }[];
}[] = [
  {
    label: "Description & presentation",
    fields: [
      { key: "desc", label: "Description", type: "text" },
      { key: "tags", label: "Tags (separes par des virgules)", type: "text" },
      { key: "modele_prix", label: "Modele de tarification", type: "text" },
      { key: "langues_solution", label: "Langues de la solution", type: "text" },
      { key: "langues_support", label: "Langues du support", type: "text" },
      { key: "references_verticales", label: "References par vertical", type: "text" },
      { key: "jauge_min", label: "Jauge minimum (nb billets/an)", type: "number" },
      { key: "jauge_max", label: "Jauge maximum (nb billets/an)", type: "number" },
    ],
  },
  {
    label: "Presence & support",
    fields: [
      { key: "bureau_france", label: "Bureau en France", type: "bool" },
      { key: "bureau_europe", label: "Bureau en Europe", type: "bool" },
      { key: "support_france", label: "Support en francais", type: "bool" },
      { key: "support_europe", label: "Support Europe", type: "bool" },
      { key: "support_24/7", label: "Support 24h/24 - 7j/7", type: "bool" },
      { key: "serveur_europe", label: "Serveurs heberges en Europe", type: "bool" },
      { key: "rgpd_conforme", label: "Conformite RGPD", type: "bool" },
    ],
  },
  {
    label: "Vente & billetterie",
    fields: [
      { key: "vente_en_ligne", label: "Vente en ligne", type: "bool" },
      { key: "vente_sur_place", label: "Vente sur place", type: "bool" },
      { key: "paiement_integre", label: "Paiement integre", type: "bool" },
      { key: "caisse_certifiee", label: "Caisse certifiee", type: "bool" },
      { key: "bornes_billet", label: "Bornes billetterie", type: "bool" },
      { key: "plan_de_salle", label: "Plan de salle interactif", type: "bool" },
      { key: "multidevise", label: "Multi-devises", type: "bool" },
      { key: "pass_culture", label: "Pass Culture", type: "bool" },
      { key: "chorus_pro_integre", label: "Chorus Pro integre", type: "bool" },
      { key: "otas", label: "Agences de voyage en ligne (OTAs)", type: "bool" },
    ],
  },
  {
    label: "Fonctionnalites avancees",
    fields: [
      { key: "controle_acces", label: "Controle d acces", type: "bool" },
      { key: "cashless", label: "Cashless", type: "bool" },
      { key: "bornes_fb", label: "Bornes F&B", type: "bool" },
      { key: "solution_fb_native", label: "F&B natif", type: "bool" },
      { key: "solution_fb_integre", label: "F&B integre (partenaire)", type: "bool" },
      { key: "tarification_dynamique", label: "Tarification dynamique", type: "bool" },
      { key: "gestion_groupes", label: "Gestion des groupes", type: "bool" },
      { key: "gestion_cse", label: "Gestion CSE", type: "bool" },
      { key: "crm_integre", label: "CRM integre", type: "bool" },
      { key: "integration_logiciels", label: "Integrations logiciels tiers", type: "bool" },
      { key: "api_ouverte", label: "API ouverte", type: "bool" },
      { key: "compte_demo", label: "Demo disponible", type: "bool" },
    ],
  },
  {
    label: "Secteurs",
    fields: [
      { key: "secteur_principal", label: "Secteur principal", type: "text" },
      { key: "secteurs_secondaires", label: "Secteurs secondaires (separes par des virgules)", type: "text" },
    ],
  },
];

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f0f0", cursor: "pointer" }}>
      <span style={{ fontSize: 14, color: "#333" }}>{label}</span>
      <div onClick={() => onChange(!value)} style={{ width: 44, height: 24, borderRadius: 12, background: value ? "#22c55e" : "#d1d5db", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 3, left: value ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
      </div>
    </label>
  );
}

function TextInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontSize: 13, color: "#666", marginBottom: 4 }}>{label}</label>
      <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={label === "Description" ? 4 : 2} style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
    </div>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number | null; onChange: (v: number | null) => void }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontSize: 13, color: "#666", marginBottom: 4 }}>{label}</label>
      <input type="number" value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))} style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, boxSizing: "border-box" }} />
    </div>
  );
}

export default function OperateurEditPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const token = searchParams.get("token");

  const [solution, setSolution] = useState<any>(null);
  const [fields, setFields] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    if (!id || !token) { setTokenError(true); setLoading(false); return; }
    supabase.from("solutions").select("*").eq("id", id).single().then(({ data, error }) => {
      if (error || !data) { setError("Operateur introuvable."); setLoading(false); return; }
      setSolution(data);
      setFields(data);
      setLoading(false);
    });
  }, [id, token]);

  const handleChange = (key: string, value: any) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/operateur/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, token, fields }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error || "Erreur lors de la sauvegarde."); }
      else { setSaved(true); }
    } catch {
      setError("Erreur reseau. Reessayez.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ color: "#888" }}>Chargement...</p></div>;
  if (tokenError) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}><div style={{ textAlign: "center" }}><p style={{ fontSize: 18, fontWeight: 600, color: "#ef4444" }}>Lien invalide</p><p style={{ color: "#888", marginTop: 8 }}>Ce lien est incomplet. Contactez l equipe TicketMatch.</p></div></div>;
  if (error && !solution) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ color: "#ef4444" }}>{error}</p></div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "32px 16px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 28 }}>🎟️</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a" }}>TicketMatch</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", margin: "0 0 8px" }}>Verifiez votre fiche — {solution?.name}</h1>
          <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, margin: 0 }}>Corrigez ce qui doit l etre, puis cliquez sur <strong>Enregistrer</strong>.</p>
        </div>
        {FIELD_GROUPS.map((group) => (
          <div key={group.label} style={{ background: "#fff", borderRadius: 12, padding: "20px 24px", marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", margin: "0 0 16px" }}>{group.label}</h2>
            {group.fields.map(({ key, label, type }) => {
              if (type === "bool") {
                const val = fields[key];
                const boolVal = val === true || val === "TRUE" || val === "true" || val === "Oui";
                return <Toggle key={key} label={label} value={boolVal} onChange={(v) => handleChange(key, v)} />;
              }
              if (type === "number") return <NumberInput key={key} label={label} value={fields[key] ?? null} onChange={(v) => handleChange(key, v)} />;
              return <TextInput key={key} label={label} value={fields[key] ?? ""} onChange={(v) => handleChange(key, v)} />;
            })}
          </div>
        ))}
        <div style={{ position: "sticky", bottom: 16, background: "#fff", borderRadius: 12, padding: "16px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            {saved && <p style={{ color: "#22c55e", fontSize: 14, fontWeight: 600, margin: 0 }}>Modifications enregistrees</p>}
            {error && <p style={{ color: "#ef4444", fontSize: 14, margin: 0 }}>{error}</p>}
            {!saved && !error && <p style={{ color: "#888", fontSize: 13, margin: 0 }}>Modifications non sauvegardees</p>}
          </div>
          <button onClick={handleSave} disabled={saving} style={{ background: saving ? "#d1d5db" : "#1a1a1a", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}>
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
        <p style={{ textAlign: "center", color: "#aaa", fontSize: 12, marginTop: 32 }}>
          Une question ? <a href="mailto:manuelatille@neuroplayxperiences.com" style={{ color: "#666" }}>manuelatille@neuroplayxperiences.com</a>
        </p>
      </div>
    </div>
  );
}
