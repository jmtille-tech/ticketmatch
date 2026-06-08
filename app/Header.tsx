"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <nav style={{
      background: "#fff",
      borderBottom: "1px solid #ebebeb",
      padding: "0 16px",
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        .header-back { font-size: 12px; color: #aaa; text-decoration: none; display: flex; align-items: center; gap: 4px; }
        .header-logo { font-family: 'Playfair Display', Georgia, serif; font-size: 22px; font-weight: 700; cursor: pointer; }
        .header-demo { background: #a8d8b0; color: #fff; border-radius: 8px; padding: 8px 16px; font-size: 13px; font-weight: 700; text-decoration: none; white-space: nowrap; }
        @media (max-width: 480px) {
          .header-back { display: none; }
          .header-demo { padding: 7px 12px; font-size: 12px; }
          .header-logo { font-size: 18px; }
        }
      `}</style>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <a href="https://neuroplayxperiences.com" className="header-back">
          ← Neuroplay Xpériences
        </a>
        <span className="header-logo" onClick={() => router.push("/")}>
          Ticket<span style={{ color: "#a8d8b0" }}>Match</span>
        </span>
      </div>
      <a href="https://tally.so/r/0Qolz6" target="_blank" rel="noopener noreferrer" className="header-demo">
        Demander une demo
      </a>
    </nav>
  );
}
