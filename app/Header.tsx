"use client";
import { useRouter } from "next/navigation";
import { DIAGNOSTIC_URL } from "../lib/links";

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
        .header-demo { background: #141413; color: #fff; border-radius: 8px; padding: 8px 16px; font-size: 13px; font-weight: 700; text-decoration: none; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px; }
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
      {/* Seul chemin proposé vers les opérateurs : le diagnostic, jamais un contact direct */}
      <a href={DIAGNOSTIC_URL} className="header-demo">
        ✦ Agent TicketMatch
      </a>
    </nav>
  );
}

