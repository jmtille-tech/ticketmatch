"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <nav style={{
      background: "#fff",
      borderBottom: "1px solid #ebebeb",
      position: "sticky",
      top: 0,
      zIndex: 100,
      padding: "0 40px",
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      {/* Logo */}
      <span
        onClick={() => router.push("/")}
        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, cursor: "pointer" }}
      >
        Ticket<span style={{ color: "#F4601A" }}>Match</span>
      </span>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <span onClick={() => router.push("/")} style={navLink}>Éditeurs</span>
        <span onClick={() => router.push("/comparateur")} style={navLink}>Comparateur</span>
        <span onClick={() => router.push("/avis")} style={navLink}>Avis</span>
        <a href="https://tally.so/r/w4pOzN" target="_blank" rel="noopener noreferrer" style={navLink}>
          Référencer ma solution
        </a>
      </div>

      {/* CTA */}
      <a
        href="https://tally.so/r/0Qolz6"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: "#F4601A",
          color: "#fff",
          borderRadius: 8,
          padding: "10px 20px",
          fontSize: 13,
          fontWeight: 700,
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        Demander une démo
      </a>
    </nav>
  );
}

const navLink: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  color: "#444",
  cursor: "pointer",
  textDecoration: "none",
  transition: "color 0.15s",
};