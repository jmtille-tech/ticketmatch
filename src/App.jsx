import { useState } from "react";

const solutions = [
  {
    id: 1,
    initial: "M",
    name: "Mapado",
    badge: "MIS EN AVANT",
    badgeType: "featured",
    desc: "Solution SaaS française spécialisée spectacle vivant & culture. Billetterie, CRM, contrôle d'accès.",
    tags: ["SaaS", "Culture", "CRM intégré", "Collectivités"],
    rating: 4.7,
    reviews: 38,
    sectors: ["Spectacle vivant", "Musées & culture"],
  },
  {
    id: 2,
    initial: "B",
    name: "Billetweb",
    badge: "VÉRIFIÉ",
    badgeType: "verified",
    desc: "Plateforme polyvalente, très utilisée par les associations et salles indépendantes. Simple à prendre en main.",
    tags: ["Associations", "PME", "Plan de salle"],
    rating: 4.3,
    reviews: 61,
    sectors: ["Spectacle vivant", "Festivals"],
  },
  {
    id: 3,
    initial: "S",
    name: "Secutix",
    badge: "VÉRIFIÉ",
    badgeType: "verified",
    desc: "Solution enterprise suisse, très présente en France. Musées, stades, lieux culturels de grande jauge.",
    tags: ["Enterprise", "Grande jauge", "Omnicanal"],
    rating: 4.1,
    reviews: 22,
    sectors: ["Musées & culture", "Sport"],
  },
  {
    id: 4,
    initial: "R",
    name: "Redtaag",
    badge: "VÉRIFIÉ",
    badgeType: "verified",
    desc: "Billetterie cloud accessible sur tous supports. Spectacle vivant, cirque, tourisme. Plan de salle interactif.",
    tags: ["Cloud", "Cirque", "Tourisme", "Plan interactif"],
    rating: 4.0,
    reviews: 17,
    sectors: ["Spectacle vivant", "Parcs & loisirs"],
  },
  {
    id: 5,
    initial: "P",
    name: "Placeminute",
    badge: "VÉRIFIÉ",
    badgeType: "verified",
    desc: "Outil transverse avec outils d'acquisition et remarketing. Distribution multi-réseaux (Ticketmaster, BilletRéduc…).",
    tags: ["Marketing", "Multi-réseaux", "Remarketing"],
    rating: 3.9,
    reviews: 14,
    sectors: ["Festivals", "Spectacle vivant"],
  },
  {
    id: 6,
    initial: "T",
    name: "Ticketor",
    badge: "VÉRIFIÉ",
    badgeType: "verified",
    desc: "Solution internationale avec widget intégrable. Idéale pour les petites structures cherchant l'autonomie.",
    tags: ["Widget", "Autonomie", "PME"],
    rating: 4.2,
    reviews: 29,
    sectors: ["Cinéma", "Festivals"],
  },
];

const sectors = [
  { label: "Spectacle vivant", emoji: "🎭", count: 18 },
  { label: "Parcs & loisirs", emoji: "🎡", count: 11 },
  { label: "Sport", emoji: "⚽", count: 9 },
  { label: "Musées & culture", emoji: "🏛️", count: 14 },
  { label: "Festivals", emoji: "🎪", count: 16 },
  { label: "Cinéma", emoji: "🎬", count: 7 },
];

const allSectors = ["Tous les secteurs", ...sectors.map((s) => s.label)];

function Stars({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i;
        const half = !filled && rating >= i - 0.5;
        return (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="#F4601A" />
                <stop offset="50%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={filled ? "#F4601A" : half ? `url(#half-${i})` : "#e5e7eb"}
              stroke="none"
            />
          </svg>
        );
      })}
    </div>
  );
}

function SolutionCard({ sol, compare, onToggleCompare }) {
  const isInCompare = compare.includes(sol.id);
  return (
    <div style={{
      background: "#fff",
      border: isInCompare ? "2px solid #F4601A" : "1.5px solid #e8e8e8",
      borderRadius: 16,
      padding: "28px 24px 22px",
      display: "flex",
      flexDirection: "column",
      gap: 0,
      position: "relative",
      transition: "box-shadow 0.2s, border-color 0.2s",
      boxShadow: isInCompare ? "0 0 0 4px rgba(244,96,26,0.08)" : "0 2px 12px rgba(0,0,0,0.05)",
      cursor: "default",
    }}>
      {/* Badge */}
      <div style={{
        position: "absolute", top: 16, right: 16,
        fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
        color: sol.badgeType === "featured" ? "#F4601A" : "#22c55e",
        display: "flex", alignItems: "center", gap: 4,
      }}>
        {sol.badgeType === "featured" ? "⭐ " : "✔ "}{sol.badge}
      </div>

      {/* Initial */}
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: "#f5f5f5",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 20, fontWeight: 700, color: "#888",
        marginBottom: 14,
      }}>{sol.initial}</div>

      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8 }}>{sol.name}</div>
      <div style={{ fontSize: 13, color: "#777", lineHeight: 1.6, marginBottom: 14, minHeight: 60 }}>{sol.desc}</div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
        {sol.tags.map(t => (
          <span key={t} style={{
            background: "#f4f4f4", color: "#555",
            borderRadius: 6, fontSize: 11, padding: "3px 9px", fontWeight: 500,
          }}>{t}</span>
        ))}
      </div>

      <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Stars rating={sol.rating} />
          <span style={{ fontSize: 12, color: "#aaa" }}>{sol.rating.toFixed(1)} · {sol.reviews} avis</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          <button style={{
            background: "#F4601A", color: "#fff",
            border: "none", borderRadius: 8,
            padding: "8px 16px", fontSize: 12, fontWeight: 700,
            cursor: "pointer", letterSpacing: "0.02em",
          }}>Voir la fiche →</button>
          <button onClick={() => onToggleCompare(sol.id)} style={{
            background: isInCompare ? "#fff0eb" : "#f8f8f8",
            color: isInCompare ? "#F4601A" : "#888",
            border: isInCompare ? "1px solid #F4601A" : "1px solid #e5e5e5",
            borderRadius: 6, padding: "4px 10px",
            fontSize: 11, fontWeight: 600, cursor: "pointer",
          }}>
            {isInCompare ? "✔ Sélectionné" : "+ Comparer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState("Tous les secteurs");
  const [activeSector, setActiveSector] = useState(null);
  const [compare, setCompare] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const filtered = solutions.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
      s.desc.toLowerCase().includes(search.toLowerCase());
    const matchSector = selectedSector === "Tous les secteurs" ||
      activeSector === null ||
      s.sectors.includes(activeSector || selectedSector);
    return matchSearch && matchSector;
  });

  const handleSectorClick = (label) => {
    if (activeSector === label) {
      setActiveSector(null);
      setSelectedSector("Tous les secteurs");
    } else {
      setActiveSector(label);
      setSelectedSector(label);
    }
  };

  const handleToggleCompare = (id) => {
    setCompare(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const compareSolutions = solutions.filter(s => compare.includes(s.id));

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#fafaf8", minHeight: "100vh", color: "#111" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fafaf8; }
        input:focus { outline: none; }
        button:hover { opacity: 0.88; }
        .nav-link { color: #555; text-decoration: none; font-size: 13px; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; cursor: pointer; transition: color 0.15s; }
        .nav-link:hover { color: #F4601A; }
        .sector-card:hover { border-color: #F4601A !important; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(244,96,26,0.1) !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .card-anim { animation: fadeIn 0.4s ease both; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .compare-bar { animation: slideUp 0.3s ease; }
      `}</style>

      {/* NAV */}
      <nav style={{
        background: "#fff", borderBottom: "1px solid #ebebeb",
        position: "sticky", top: 0, zIndex: 100,
        padding: "0 32px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#111", letterSpacing: "-0.5px" }}>
            Ticket<span style={{ color: "#F4601A" }}>Match</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Éditeurs", "Comparateur", "Avis", "Ressources"].map(l => (
            <span key={l} className="nav-link">{l}</span>
          ))}
          <button style={{
            background: "#22c55e", color: "#fff",
            border: "none", borderRadius: 8,
            padding: "8px 18px", fontSize: 12, fontWeight: 700,
            cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase",
          }}>Référencer ma solution</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        background: "linear-gradient(160deg, #fff 60%, #fff7f4 100%)",
        padding: "72px 32px 56px",
        maxWidth: 900, margin: "0 auto",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          border: "1.5px solid #F4601A", borderRadius: 6,
          padding: "4px 14px", marginBottom: 24,
          fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#F4601A",
          textTransform: "uppercase",
        }}>
          🇫🇷 Marketplace française · Billetterie
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700,
          lineHeight: 1.12, marginBottom: 20, color: "#111",
        }}>
          Trouvez la solution de billetterie{" "}
          <span style={{ color: "#1ef41a", fontStyle: "italic" }}>faite pour votre événement</span>
        </h1>

        <p style={{ fontSize: 16, color: "#777", maxWidth: 520, lineHeight: 1.7, marginBottom: 36 }}>
          Comparez les éditeurs français et internationaux selon votre secteur, votre jauge et votre budget. Sans démarchage commercial.
        </p>

        {/* Search bar */}
        <div style={{
          display: "flex", alignItems: "center",
          background: "#fff", border: "1.5px solid #e0e0e0",
          borderRadius: 12, overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
          maxWidth: 620,
        }}>
          <span style={{ padding: "0 14px", color: "#bbb", fontSize: 18 }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Nom d'un éditeur, fonctionnalité, secteur…"
            style={{
              flex: 1, border: "none", fontSize: 14, padding: "16px 0",
              background: "transparent", color: "#111",
            }}
          />
          <div style={{ width: 1, height: 28, background: "#e8e8e8" }} />
          <select
            value={selectedSector}
            onChange={e => { setSelectedSector(e.target.value); setActiveSector(e.target.value === "Tous les secteurs" ? null : e.target.value); }}
            style={{
              border: "none", background: "transparent",
              padding: "0 16px", fontSize: 13, color: "#555",
              fontFamily: "inherit", cursor: "pointer", height: 52,
            }}
          >
            {allSectors.map(s => <option key={s}>{s}</option>)}
          </select>
          <button style={{
            background: "#F4601A", color: "#fff",
            border: "none", padding: "0 24px", height: 52,
            fontSize: 14, fontWeight: 700, cursor: "pointer",
            borderRadius: "0 10px 10px 0",
          }}>Rechercher</button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 40, marginTop: 40 }}>
          {[
            { n: "48", label: "Éditeurs référencés" },
            { n: "6", label: "Secteurs couverts" },
            { n: "312", label: "Avis vérifiés" },
            { n: "Gratuit", label: "Pour les exploitants" },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700 }}>{s.n}</div>
              <div style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTORS */}
      <section style={{ padding: "0 32px 48px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700 }}>Parcourir par secteur</h2>
          <span style={{ color: "#F4601A", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Voir tous les secteurs →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
          {sectors.map(s => (
            <div
              key={s.label}
              className="sector-card"
              onClick={() => handleSectorClick(s.label)}
              style={{
                background: activeSector === s.label ? "#fff7f4" : "#fff",
                border: activeSector === s.label ? "2px solid #F4601A" : "1.5px solid #e8e8e8",
                borderRadius: 12, padding: "18px 12px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                cursor: "pointer", transition: "all 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <span style={{ fontSize: 28 }}>{s.emoji}</span>
              <span style={{ fontSize: 12, fontWeight: 600, textAlign: "center", color: "#222" }}>{s.label}</span>
              <span style={{ fontSize: 11, color: "#aaa" }}>{s.count} solutions</span>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTIONS GRID */}
      <section style={{ padding: "0 32px 60px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700 }}>
            {activeSector ? `Solutions pour ${activeSector}` : "Solutions pour le spectacle vivant"}
          </h2>
          <span style={{ color: "#F4601A", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Voir les {filtered.length + 13} solutions →
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {filtered.map((sol, i) => (
            <div key={sol.id} className="card-anim" style={{ animationDelay: `${i * 0.06}s` }}>
              <SolutionCard sol={sol} compare={compare} onToggleCompare={handleToggleCompare} />
            </div>
          ))}

          {/* CTA card */}
          <div style={{
            border: "2px dashed #e0e0e0", borderRadius: 16,
            padding: "28px 24px", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 14,
            background: "#fff",
          }}>
            <div style={{ fontSize: 32, color: "#ccc" }}>＋</div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, textAlign: "center" }}>Vous êtes éditeur ?</div>
            <div style={{ fontSize: 13, color: "#aaa", textAlign: "center", lineHeight: 1.6 }}>
              Référencez gratuitement votre solution et accédez à des leads qualifiés.
            </div>
            <button style={{
              background: "transparent", color: "#F4601A",
              border: "2px solid #F4601A", borderRadius: 8,
              padding: "9px 18px", fontSize: 13, fontWeight: 700,
              cursor: "pointer",
            }}>Déposer ma fiche →</button>
          </div>
        </div>
      </section>

      {/* COMPARE BANNER */}
      {compare.length > 0 && (
        <div className="compare-bar" style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: "#111", color: "#fff",
          borderRadius: 16, padding: "16px 28px",
          display: "flex", alignItems: "center", gap: 20,
          boxShadow: "0 8px 40px rgba(0,0,0,0.25)", zIndex: 200,
          minWidth: 380,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: "#aaa", marginBottom: 4 }}>Comparer {compare.length}/3 solutions</div>
            <div style={{ display: "flex", gap: 8 }}>
              {compareSolutions.map(s => (
                <span key={s.id} style={{
                  background: "#222", borderRadius: 6, padding: "3px 10px",
                  fontSize: 12, fontWeight: 600,
                }}>{s.name}</span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowCompare(true)}
            style={{
              background: "#F4601A", color: "#fff",
              border: "none", borderRadius: 8,
              padding: "10px 22px", fontSize: 13, fontWeight: 700,
              cursor: "pointer",
            }}>Comparer →</button>
          <button onClick={() => setCompare([])} style={{
            background: "transparent", color: "#666",
            border: "none", fontSize: 18, cursor: "pointer",
          }}>×</button>
        </div>
      )}

      {/* COMPARE MODAL */}
      {showCompare && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center",
        }} onClick={() => setShowCompare(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#fff", borderRadius: 20, padding: 36,
            maxWidth: 800, width: "90%", maxHeight: "80vh", overflowY: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24 }}>Comparaison</h2>
              <button onClick={() => setShowCompare(false)} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#888" }}>×</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${compareSolutions.length}, 1fr)`, gap: 20 }}>
              {compareSolutions.map(s => (
                <div key={s.id} style={{ borderRadius: 12, border: "1.5px solid #eee", padding: 20 }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.name}</div>
                  <Stars rating={s.rating} />
                  <div style={{ fontSize: 13, color: "#aaa", margin: "6px 0 14px" }}>{s.rating} · {s.reviews} avis</div>
                  <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 14 }}>{s.desc}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {s.tags.map(t => (
                      <span key={t} style={{ background: "#f4f4f4", borderRadius: 5, padding: "3px 8px", fontSize: 11 }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid #ebebeb", background: "#fff",
        padding: "32px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700 }}>
            Ticket<span style={{ color: "#F4601A" }}>Match</span>
          </span>
          <p style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>La référence des éditeurs de billetterie en France</p>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["Mentions légales", "Contact", "Référencer ma solution", "Blog"].map(l => (
            <span key={l} style={{ fontSize: 13, color: "#777", cursor: "pointer" }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
