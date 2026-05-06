"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <nav style={{ background: "#fff", borderBottom: "1px solid #ebebeb", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <a href="https://neuroplayxperiences.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#aaa", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
          ← Neuroplay Xpériences
        </a>
        <span onClick={() => router.push("/")} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, cursor: "pointer" }}>
          Ticket<span style={{ color: "#c8f135" }}>Match</span>
        </span>
      </div>
      <a href="https://tally.so/r/0Qolz6" target="_blank" rel="noopener noreferrer" style={{ background: "#c8f135", color: "#fff", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
        Demander une demo
      </a>
    </nav>
  );
}