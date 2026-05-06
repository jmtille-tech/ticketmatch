"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <nav style={{
      background: "#fff",
      borderBottom: "1px solid #ebebeb",
      padding: "0 40px",
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      <span
        onClick={() => router.push("/")}
        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, cursor: "pointer" }}
      >
        Ticket<span style={{ color: "#F4601A" }}>Match</span>
      </span>

      
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
        }}
      >
        Demander une démo
      </a>
    </nav>
  );
}
