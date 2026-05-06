"use client";
import { useRouter } from "next/navigation";

export default function AvisPage() {
  const router = useRouter();
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafaf8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 48, border: "1.5px solid #e8e8e8", textAlign: "center", maxWidth: 480, width: "100%" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⭐</div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Laisser un avis</h1>
        <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7, marginBottom: 28 }}>Vous utilisez une solution de billetterie ? Partagez votre experience et aidez la communaute a faire le bon choix.</p>
        <a href="https://tally.so/r/xX9Xyd" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#F4601A", color: "#fff", borderRadius: 8, padding: "14px 32px", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
          Donner mon avis
        </a>
        <div style={{ marginTop: 20 }}>
          <button onClick={() => router.push("/")} style={{ background: "none", border: "none", color: "#aaa", fontSize: 13, cursor: "pointer" }}>
            Retour aux solutions
          </button>
        </div>
      </div>
    </div>
  );
}
