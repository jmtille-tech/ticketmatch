"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

const isTrue = (val: any) => val === true || val === "TRUE" || val === "true" || val === "Oui" || val === "oui";

function Badge({ label, value }: { label: string; value: any }) {
  if (!isTrue(value)) return null;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "8px 14px", background: "#f0fdf4",
      border: "1px solid #bbf7d0", borderRadius: 8,
      fontSize: 13, color: "#166534", fontWeight: 500,
    }}>
      ✔ {label}
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={rating >= i ? "#F4601A" : "#e5e7eb"}
          />
        </svg>
      ))}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: any }) {
  const bool = isTrue(value);
  const isBool = value === true || value === false || value === "TRUE" || value === "true" || value === "Oui" || value === "oui" || value === "Non" || value === "non" || value === "FALSE" || value === "false";
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, alignItems: "center" }}>
      <span style={{ color: "#888" }}>{label}</span>
      {isBool ? (
        <span style={{ fontWeight: 600, color: bool ? "#22c55e" : "#ef4444" }}>
          {bool ? "✔ Oui" : "✗ Non"}
        </span>
      ) : (
        <span style={{ fontWeight: 600, textAlign: "right", maxWidth: 180 }}>{value || "—"}</span>
      )}
    </div>
  );
}

export default function SolutionPage() {
  const params = useParams();
  const router = useRouter();
  const [solution, setSolution] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolution = async () => {
      const { data } = await supabase
        .from("solutions")
        .select("*")
        .eq("id", params.id)
        .single();
      setSolution(data);
      setLoading(false);
    };
    fetchSolution();
  }, [params.id]);

  if (loading) return (
    <div style={{ textAlign: "center", padding: 80, fontFamily: "DM Sans, sans-serif", color: "#aaa" }}>
      Chargement…
    </div>
  );

  if (!solution) return (
    <div style={{ textAlign: "center", padding: 80, fontFamily: "DM Sans, sans-serif" }}>
      Solution introuvable
    </div>
  );

  const tags = solution.tags ? solution.tags.split(",") : [];
  const langues = solution.langues ? solution.langues.split(",") : [];

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#fafaf8", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* NAV */}
      <nav style={{
        background: "#fff", borderBottom: "1px solid #ebebeb",
        position: "sticky", top: 0, zIndex: 100,
        padding: "0 40px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span onClick={() => router.push("/")}
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, cursor: "pointer" }}>
          Ticket<span style={{ color: "#F4601A" }}>Match</span>
        </span>
        <button onClick={() => router.push("/")}
          style={{ background: "transparent", color: "#555", border: "1.5px solid #e0e0e0", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          ← Retour aux solutions
        </button>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 40px" }}>

        {/* HEADER */}
        <div style={{
          background: "#fff", borderRadius: 20, padding: 40,
          border: "1.5px solid #e8e8e8", marginBottom: 24,
          boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: "#f5f5f5", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 28, fontWeight: 700,
                color: "#888", fontFamily: "'Playfair Display', Georgia, serif", flexShrink: 0,
              }}>{solution.initial}</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#111" }}>
                    {solution.name}
                  </h1>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
                    color: solution.badge_type === "featured" ? "#F4601A" : "#22c55e",
                    background: solution.badge_type === "featured" ? "#fff7f4" : "#f0fdf4",
                    padding: "3px 10px", borderRadius: 6,
                  }}>
                    {solution.badge_type === "featured" ? "⭐ " : "✔ "}{solution.badge}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Stars rating={solution.rating || 0} />
                  <span style={{ fontSize: 14, color: "#777" }}>{solution.rating} · {solution.reviews} avis</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
              {solution.site_web && (
                <a href={solution.site_web} target="_blank" rel="noopener noreferrer"
                  style={{ background: "#F4601A", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", textDecoration: "none" }}>
                  Visiter le site →
                </a>
              )}
              <button style={{ background: "#fff", color: "#F4601A", border: "2px solid #F4601A", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                Demander une démo
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>

          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Description */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1.5px solid #e8e8e8" }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Présentation</h2>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>{solution.desc}</p>
              {tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
                  {tags.map((t: string) => (
                    <span key={t} style={{ background: "#f4f4f4", color: "#555", borderRadius: 6, fontSize: 12, padding: "4px 12px", fontWeight: 500 }}>{t.trim()}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Fonctionnalités */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1.5px solid #e8e8e8" }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Fonctionnalités</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Badge label="Paiement intégré" value={solution.paiement_integre} />
                <Badge label="Caisse certifiée" value={solution.caisse_certifiee} />
                <Badge label="Contrôle d'accès" value={solution.controle_acces} />
                <Badge label="Cashless" value={solution.cashless} />
                <Badge label="Gestion F&B" value={solution.gestion_fb} />
                <Badge label="Bornes de caisse" value={solution.bornes_caisse} />
                <Badge label="Bornes F&B" value={solution.bornes_fb} />
                <Badge label="Tarification dynamique" value={solution.tarification_dynamique} />
                <Badge label="Gestion des groupes" value={solution.gestion_groupes} />
                <Badge label="CSE" value={solution.gestion_cse} />
                <Badge label="CRM intégré" value={solution.crm_integre} />
                <Badge label="API ouverte" value={solution.api_ouverte} />
                <Badge label="Plan de salle" value={solution.plan_de_salle} />
                <Badge label="Billetterie mobile" value={solution.billetterie_mobile} />
                <Badge label="Vente en ligne" value={solution.vente_en_ligne} />
                <Badge label="Multidevise" value={solution.multidevise} />
                <Badge label="Pass Culture" value={solution.pass_culture} />
                <Badge label="Chorus Pro" value={solution.chorus_pro} />
                <Badge label="Revente marché" value={solution.revente_marche} />
                <Badge label="RGPD conforme" value={solution.rgpd_conforme} />
              </div>
            </div>

            {/* Intégrations */}
            {solution.integration_logiciels && (
              <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1.5px solid #e8e8e8" }}>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Intégrations</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {solution.integration_logiciels.split(",").map((i: string) => (
                    <span key={i} style={{ background: "#f0f0ff", color: "#4444aa", borderRadius: 6, fontSize: 12, padding: "4px 12px", fontWeight: 500 }}>{i.trim()}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Infos clés */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1.5px solid #e8e8e8" }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, marginBottom: 18 }}>Infos clés</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {solution.type_solution && <InfoRow label="Type" value={solution.type_solution} />}
                <InfoRow label="Bureau en France" value={solution.bureau_france} />
                <InfoRow label="Bureau en Europe" value={solution.bureau_europe} />
                <InfoRow label="Support France" value={solution.support_france} />
                <InfoRow label="Support Europe" value={solution.support_europe} />
                <InfoRow label="Support 24h/24" value={solution.support_24h} />
                <InfoRow label="Serveur France" value={solution.hebergement_france} />
                <InfoRow label="Serveur Europe" value={solution.serveur_europe} />
                <InfoRow label="Compte démo" value={solution.compte_demo} />
                <InfoRow label="Modèle de prix" value={solution.modele_prix || "Sur devis"} />
                {langues.length > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "#888" }}>Langues</span>
                    <span style={{ fontWeight: 600, textAlign: "right", maxWidth: 180 }}>{langues.join(", ")}</span>
                  </div>
                )}
                {solution.references_verticales && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "#888" }}>Références</span>
                    <span style={{ fontWeight: 600, textAlign: "right", maxWidth: 180 }}>{solution.references_verticales}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact */}
            <div style={{ background: "linear-gradient(135deg, #fff7f4, #fff)", borderRadius: 16, padding: 28, border: "1.5px solid #fdd9cc" }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Intéressé ?</h2>
              <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6, marginBottom: 16 }}>Demandez une démonstration gratuite ou plus d'informations.</p>
              <button style={{ width: "100%", background: "#F4601A", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 10 }}>
                Demander une démo
              </button>
              {solution.site_web && (
                <a href={solution.site_web} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", width: "100%", background: "#fff", color: "#F4601A", border: "2px solid #F4601A", borderRadius: 10, padding: "10px", fontSize: 14, fontWeight: 700, cursor: "pointer", textAlign: "center", textDecoration: "none" }}>
                  Visiter le site
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
