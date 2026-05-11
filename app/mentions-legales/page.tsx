export default function MentionsLegales() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafaf8", minHeight: "100vh", padding: "48px 40px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", background: "#fff", borderRadius: 20, padding: 48, border: "1.5px solid #e8e8e8" }}>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 700, marginBottom: 32 }}>Mentions legales</h1>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Editeur du site</h2>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>
            Digital Expertise<br />
            Immatriculation au RCS, numero 789 250 040 R.C.S. Chambery<br />
            Lyon, France<br />
            Email : contact@neuroplayxperiences.fr
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Hebergement</h2>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>
            Vercel Inc.<br />
            440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
            https://vercel.com<br />
            <br />
            Nom de domaine heberge par :<br />
            OVH SAS<br />
            2 rue Kellermann, 59100 Roubaix, France<br />
            https://www.ovh.com
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Propriete intellectuelle</h2>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>
            L'ensemble du contenu de ce site est la propriete exclusive de Digital Expertise, sauf mention contraire. Toute reproduction sans autorisation prealable est interdite.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Donnees personnelles</h2>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>
            Les donnees collectees via les formulaires sont utilisees uniquement pour repondre aux demandes. Conformement au RGPD, vous disposez d'un droit d'acces, rectification et suppression. Contact : contact@neuroplayxperiences.fr
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Cookies</h2>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>
            Ce site n'utilise pas de cookies de suivi ou publicitaires.
          </p>
        </section>
      </div>
    </div>
  );
}