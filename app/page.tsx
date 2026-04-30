"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const sectors = [
  { label: "Spectacle vivant", emoji: "🎭", count: 16 },
  { label: "Musées & culture", emoji: "🏛️", count: 14 },
  { label: "Festivals & Concerts", emoji: "🎪", count: 13 },
  { label: "Sport", emoji: "⚽", count: 10 },
  { label: "Parcs d'attractions", emoji: "🎡", count: 7 },
  { label: "Activités de loisirs indoors", emoji: "🎳", count: 5 },
  { label: "Parcs aquatiques", emoji: "🏊", count: 6 },
  { label: "Activités de loisirs outdoors", emoji: "🌲", count: 6 },
  { label: "Zoos & Parcs animaliers", emoji: "🦁", count: 4 },
];

const allSectors = ["Tous les secteurs", ...sectors.map((s) => s.label)];

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={rating >= i ? "#F4601A" : "#e5e7eb"}
            stroke="none"
          />
        </svg>
      ))}
    </div>
  );
}

function SolutionCard({ sol, compare, onToggleCompare }: { sol: any; compare: number[]; onToggleCompare: (id: number) => void }) {
  const router = useRouter();
  const isInCompare = compare.includes(sol.id);
  const tags = sol.tags ? sol.tags.split(",") : [];
  return (
    <div style={{
      background: "#fff",
      border: isInCompare ? "2px solid #F4601A" : "1.5px solid #e8e8e8",
      borderRadius: 16, padding: "28px 24px 22px",
      display: "flex", flexDirection: "column",
      boxShadow: isInCompare ? "0 0 0 4px rgba(244,96,26,0.08)" : "0 2px 12px rgba(0,0,0,0.05)",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: 16, right: 16,
        fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
        color: sol.badge_type === "featured" ? "#F4601A" : "#22c55e",
      }}>
        {sol.badge_type === "featured" ? "⭐ " : "✔ "}{sol.badge}
      </div>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: "#f5f5f5", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 20, fontWeight: 700,
        color: "#888", marginBottom: 14,
        fontFamily: "'Playfair Display', Georgia, serif",
      }}>{sol.initial}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, fontFamily: "'Playfair Display', Georgia, serif" }}>{sol.name}</div>
      <div style={{ fontSize: 13, color: "#777", lineHeight: 1.6, marginBottom: 14, minHeight: 60 }}>{sol.desc}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
        {tags.map((t: string) => (
          <span key={t} style={{ background: "#f4f4f4", color: "#555", borderRadius: 6, fontSize: 11, padding: "3px 9px", fontWeight: 500 }}>{t.trim()}</span>
        ))}
      </div>
      <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <Stars rating={sol.rating || 0} />
          <span style={{ fontSize: 12, color: "#aaa" }}>{sol.rating} · {sol.reviews} avis</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          <button onClick={() => router.push(`/solutions/${sol.id}`)} style={{ background: "#F4601A", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            Voir la fiche →
          </button>
          <button onClick={() => onToggleCompare(sol.id)} style={{
            background: isInCompare ? "#fff0eb" : "#f8f8f8",
            color: isInCompare ? "#F4601A" : "#888",
            border: isInCompare ? "1px solid #F4601A" : "1px solid #e5e5e5",
            borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer",
          }}>
            {isInCompare ? "✔ Sélectionné" : "+ Comparer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState("Tous les secteurs");
  const [compare, setCompare] = useState<number[]>([]);
  const [compareTab, setCompareTab] = useState("infos");
  const [sectorCounts, setSectorCounts] = useState<{[key: string]: number}>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
     const { data, error } = await supabase.from("solutions").select("*").limit(100);
      if (error) { console.error(error); }
      else { setSolutions(data); }
      const counts: {[key: string]: number} = {};
sectors.forEach(sector => {
  counts[sector.label] = (data || []).filter((s: any) => 
    s.secteurs_secondaires?.toLowerCase().includes(sector.label.toLowerCase())
  ).length;
});
setSectorCounts(counts);
      setLoading(false);
    };
    fetchSolutions();
  }, []);

  const filtered = solutions.filter((s) => {
    const matchSearch = !search ||
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.desc?.toLowerCase().includes(search.toLowerCase()) ||
      s.tags?.toLowerCase().includes(search.toLowerCase());
    const matchSector = !activeSector || s.secteurs_secondaires?.toLowerCase().includes(activeSector.toLowerCase()) ||
s.secteur_principal?.toLowerCase().includes(activeSector.toLowerCase())
    return matchSearch && matchSector;
  });

  const handleToggleCompare = (id: number) => {
    setCompare((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev);
  };

  const compareSolutions = solutions.filter((s) => compare.includes(s.id));

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#fafaf8", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button:hover { opacity: 0.88; }
        .sector-card:hover { border-color: #F4601A !important; transform: translateY(-2px); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .card-anim { animation: fadeIn 0.4s ease both; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .compare-bar { animation: slideUp 0.3s ease; }
      `}</style>

      {/* NAV */}
      <nav style={{
        background: "#fff", borderBottom: "1px solid #ebebeb",
        position: "sticky", top: 0, zIndex: 100,
        padding: "0 40px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700 }}>
          Ticket<span style={{ color: "#F4601A" }}>Match</span>
        </span>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Éditeurs", "Comparateur", "Avis", "Ressources"].map((l) => (
            <span key={l} style={{ color: "#555", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", cursor: "pointer" }}>{l}</span>
          ))}
          <button style={{ background: "#F4601A", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            Référencer ma solution
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "linear-gradient(160deg, #fff 60%, #fff7f4 100%)", padding: "72px 40px 56px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1.5px solid #F4601A", borderRadius: 6, padding: "4px 14px", marginBottom: 24, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#F4601A", textTransform: "uppercase" }}>
          🇫🇷 Marketplace française · Billetterie
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.12, marginBottom: 20, color: "#111" }}>
          Trouvez la solution de billetterie{" "}
          <span style={{ color: "#F4601A", fontStyle: "italic" }}>faite pour vous</span>
        </h1>
        <p style={{ fontSize: 16, color: "#777", maxWidth: 520, lineHeight: 1.7, marginBottom: 36 }}>
          Comparez les éditeurs français et internationaux selon votre secteur, votre jauge et votre budget. Sans démarchage commercial.
        </p>
        <div style={{ display: "flex", alignItems: "center", background: "#fff", border: "1.5px solid #e0e0e0", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", maxWidth: 620 }}>
          <span style={{ padding: "0 14px", color: "#bbb", fontSize: 18 }}>🔍</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nom d'un éditeur, fonctionnalité, secteur…"
            style={{ flex: 1, border: "none", fontSize: 14, padding: "16px 0", background: "transparent", color: "#111", outline: "none" }} />
          <div style={{ width: 1, height: 28, background: "#e8e8e8" }} />
          <select value={selectedSector} onChange={(e) => { setSelectedSector(e.target.value); setActiveSector(e.target.value === "Tous les secteurs" ? null : e.target.value); }}
            style={{ border: "none", background: "transparent", padding: "0 16px", fontSize: 13, color: "#555", fontFamily: "inherit", cursor: "pointer", height: 52 }}>
            {allSectors.map(s => <option key={s}>{s}</option>)}
          </select>
          <button style={{ background: "#F4601A", color: "#fff", border: "none", padding: "0 24px", height: 52, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            Rechercher
          </button>
        </div>
        <div style={{ display: "flex", gap: 40, marginTop: 40 }}>
          {[{ n: solutions.length.toString(), label: "Éditeurs référencés" }, { n: "6", label: "Secteurs couverts" }, { n: "312", label: "Avis vérifiés" }, { n: "Gratuit", label: "Pour les exploitants" }].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700 }}>{s.n}</div>
              <div style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTORS */}
      <section style={{ padding: "0 40px 48px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700 }}>Parcourir par secteur</h2>
          <span style={{ color: "#F4601A", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Voir tous les secteurs →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
          {sectors.map((s) => (
            <div key={s.label} className="sector-card" onClick={() => setActiveSector(activeSector === s.label ? null : s.label)}
              style={{ background: activeSector === s.label ? "#fff7f4" : "#fff", border: activeSector === s.label ? "2px solid #F4601A" : "1.5px solid #e8e8e8", borderRadius: 12, padding: "18px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer", transition: "all 0.2s" }}>
              <span style={{ fontSize: 28 }}>{s.emoji}</span>
              <span style={{ fontSize: 12, fontWeight: 600, textAlign: "center", color: "#222" }}>{s.label}</span>
              <span style={{ fontSize: 11, color: "#aaa" }}>{sectorCounts[s.label] || 0} solutions</span>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTIONS */}
      <section style={{ padding: "0 40px 60px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700 }}>
            {activeSector ? `Solutions pour ${activeSector}` : "Toutes les solutions"}
          </h2>
          <span style={{ color: "#F4601A", fontSize: 13, fontWeight: 600 }}>{filtered.length} solutions</span>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#aaa", fontSize: 16 }}>Chargement des solutions…</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {filtered.map((sol, i) => (
              <div key={sol.id} className="card-anim" style={{ animationDelay: `${i * 0.06}s` }}>
                <SolutionCard sol={sol} compare={compare} onToggleCompare={handleToggleCompare} />
              </div>
            ))}
            <div style={{ border: "2px dashed #e0e0e0", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, background: "#fff" }}>
              <div style={{ fontSize: 32, color: "#ccc" }}>＋</div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, textAlign: "center" }}>Vous êtes éditeur ?</div>
              <div style={{ fontSize: 13, color: "#aaa", textAlign: "center", lineHeight: 1.6 }}>Référencez gratuitement votre solution.</div>
              <button style={{ background: "transparent", color: "#F4601A", border: "2px solid #F4601A", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                Déposer ma fiche →
              </button>
            </div>
          </div>
        )}
      </section>

      {/* COMPARE BAR */}
      {compare.length > 0 && (
        <div className="compare-bar" style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#111", color: "#fff", borderRadius: 16, padding: "16px 28px", display: "flex", alignItems: "center", gap: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.25)", zIndex: 200, minWidth: 380 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "#aaa", marginBottom: 4 }}>Comparer {compare.length}/3 solutions</div>
            <div style={{ display: "flex", gap: 8 }}>
              {compareSolutions.map((s) => (
                <span key={s.id} style={{ background: "#222", borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{s.name}</span>
              ))}
            </div>
          </div>
          <button onClick={() => setShowCompare(true)} style={{ background: "#F4601A", color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Comparer →</button>
          <button onClick={() => setCompare([])} style={{ background: "transparent", color: "#666", border: "none", fontSize: 18, cursor: "pointer" }}>×</button>
        </div>
      )}

      {/* COMPARE MODAL */}
      {/* COMPARE MODAL */}
{showCompare && (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowCompare(false)}>
    <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, padding: 36, maxWidth: 900, width: "95%", maxHeight: "85vh", overflowY: "auto" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24 }}>Comparaison</h2>
        <button onClick={() => setShowCompare(false)} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#888" }}>×</button>
      </div>

      {/* Onglets */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        <button onClick={() => setCompareTab("infos")} style={{ padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: compareTab === "infos" ? "#F4601A" : "#f4f4f4", color: compareTab === "infos" ? "#fff" : "#555" }}>
          Infos clés
        </button>
        <button onClick={() => setCompareTab("fonctions")} style={{ padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: compareTab === "fonctions" ? "#F4601A" : "#f4f4f4", color: compareTab === "fonctions" ? "#fff" : "#555" }}>
          Fonctionnalités
        </button>
      </div>

      {/* Noms des solutions */}
      <div style={{ display: "grid", gridTemplateColumns: `200px repeat(${compareSolutions.length}, 1fr)`, gap: 0, marginBottom: 8 }}>
        <div />
        {compareSolutions.map((s) => (
          <div key={s.id} style={{ textAlign: "center", padding: "12px 8px", background: "#fff7f4", borderRadius: 8, margin: "0 4px", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 16 }}>
            {s.name}
            <div style={{ fontSize: 12, color: "#aaa", fontFamily: "DM Sans, sans-serif", fontWeight: 400, marginTop: 4 }}>
              ⭐ {s.rating} · {s.reviews} avis
            </div>
          </div>
        ))}
      </div>

      {/* Contenu Infos clés */}
      {compareTab === "infos" && (
        <div>
          {[
            { label: "Type de solution", key: "type_solution" },
            { label: "Bureau en France", key: "bureau_france" },
            { label: "Bureau en Europe", key: "bureau_europe" },
            { label: "Support France", key: "support_france" },
            { label: "Support Europe", key: "support_europe" },
            { label: "Support 24h/24", key: "support_24h" },
            { label: "Serveur Europe", key: "serveur_europe" },
            { label: "RGPD conforme", key: "rgpd_conforme" },
            { label: "Compte démo", key: "compte_demo" },
            { label: "F&B natif", key: "solution_fb_native" },
            { label: "F&B intégré", key: "solution_fb_integre" },
            { label: "Modèle de prix", key: "modele_prix" },
            { label: "Secteur principal", key: "secteur_principal" },
          ].map((row, i) => (
            <div key={row.key} style={{ display: "grid", gridTemplateColumns: `200px repeat(${compareSolutions.length}, 1fr)`, gap: 0, background: i % 2 === 0 ? "#fafaf8" : "#fff", borderRadius: 6, padding: "10px 0" }}>
              <div style={{ fontSize: 13, color: "#888", padding: "0 12px", display: "flex", alignItems: "center" }}>{row.label}</div>
              {compareSolutions.map((s) => {
                const val = s[row.key];
                const isBool = ["TRUE", "true", "FALSE", "false", "Oui", "oui", "Non", "non"].includes(String(val)) || val === true || val === false;
                const bool = val === true || val === "TRUE" || val === "true" || val === "Oui" || val === "oui";
                return (
                  <div key={s.id} style={{ textAlign: "center", fontSize: 13, fontWeight: 600, padding: "0 8px" }}>
                    {isBool ? (
                      <span style={{ color: bool ? "#22c55e" : "#ef4444" }}>{bool ? "✔" : "✗"}</span>
                    ) : (
                      <span>{val || "—"}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Contenu Fonctionnalités */}
      {compareTab === "fonctions" && (
        <div>
          {[
            { label: "Paiement intégré", key: "paiement_integre" },
            { label: "Caisse certifiée", key: "caisse_certifiee" },
            { label: "Bornes billetterie", key: "bornes_billet" },
            { label: "Cashless", key: "cashless" },
            { label: "Vente sur place", key: "vente_sur_place" },
            { label: "Vente en ligne", key: "vente_en_ligne" },
            { label: "Bornes F&B", key: "bornes_fb" },
            { label: "Contrôle d'accès", key: "controle_acces" },
            { label: "Tarification dynamique", key: "tarification_dynamique" },
            { label: "Gestion des groupes", key: "gestion_groupes" },
            { label: "CSE", key: "gestion_cse" },
            { label: "CRM intégré", key: "crm_integre" },
            { label: "API ouverte", key: "api_ouverte" },
            { label: "Plan de salle", key: "plan_de_salle" },
            { label: "Multidevise", key: "multidevise" },
            { label: "Pass Culture", key: "pass_culture" },
            { label: "Chorus Pro", key: "chorus_pro_integre" },
            { label: "OTAs", key: "otas" },
          ].map((row, i) => (
            <div key={row.key} style={{ display: "grid", gridTemplateColumns: `200px repeat(${compareSolutions.length}, 1fr)`, gap: 0, background: i % 2 === 0 ? "#fafaf8" : "#fff", borderRadius: 6, padding: "10px 0" }}>
              <div style={{ fontSize: 13, color: "#888", padding: "0 12px", display: "flex", alignItems: "center" }}>{row.label}</div>
              {compareSolutions.map((s) => {
                const val = s[row.key];
                const bool = val === true || val === "TRUE" || val === "true" || val === "Oui" || val === "oui";
                return (
                  <div key={s.id} style={{ textAlign: "center", fontSize: 14, fontWeight: 700 }}>
                    <span style={{ color: bool ? "#22c55e" : "#ef4444" }}>{bool ? "✔" : "✗"}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}
      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #ebebeb", background: "#fff", padding: "32px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700 }}>Ticket<span style={{ color: "#F4601A" }}>Match</span></span>
          <p style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>La référence des éditeurs de billetterie en France</p>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["Mentions légales", "Contact", "Référencer ma solution", "Blog"].map((l) => (
            <span key={l} style={{ fontSize: 13, color: "#777", cursor: "pointer" }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}