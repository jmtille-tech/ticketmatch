export default function Footer() {
  return (
    <footer style={{
      background: "#fff",
      borderTop: "1px solid #ebebeb",
      padding: "28px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      fontSize: 13,
      color: "#aaa",
    }}>
      <span style={{ fontFamily: "'Playfair Display', Georgia,  serif", fontSize: 18, fontWeight: 700, color: "#111" }}>
        Ticket<span style={{ color: "#a8d8b0" }}>Match</span>
      </span>

      <a href="/mentions-legales" style={{ color: "#aaa", textDecoration: "none", fontSize: 13 }}>
        Mentions légales
      </a>

      <span>© {new Date().getFullYear()} TicketMatch. Tous droits réservés.</span>
    </footer>
  );
}