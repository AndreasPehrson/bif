import { FormEvent, useState } from "react";

type Status = "idle" | "sent";

const DEFAULT_SUBJECT = "Forespørgsel: workshop til institution";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire up to Formspree / Web3Forms / custom endpoint.
    console.log(
      "Kontaktformular sendt",
      Object.fromEntries(new FormData(event.currentTarget))
    );
    setStatus("sent");
  }

  return (
    <section className="section container" id="contact">
      <h2>Kontakt</h2>
      <p className="section-intro">
        Kort besked med de vigtigste oplysninger (fx institution, målgruppe,
        tidsrum) — så kan vi afstemme format og næste skridt.
      </p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="hidden" name="subject" defaultValue={DEFAULT_SUBJECT} />
        <label>
          Navn
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Institution / organisation
          <input name="organization" required autoComplete="organization" />
        </label>
        <label>
          E-mail
          <input type="email" name="email" required autoComplete="email" />
        </label>
        <label>
          Telefon (valgfrit)
          <input type="tel" name="phone" autoComplete="tel" />
        </label>
        <label>
          Besked
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Skriv fx målgruppe, ønsket dato eller uge, ca. deltagerantal og om det foregår hos jer, andet lokale eller online."
          />
        </label>
        <p className="form-footnote">
          Henvendelsen behandles fortroligt og bruges kun til at besvare dig.
        </p>
        <button type="submit" className="btn btn-primary">
          Send forespørgsel
        </button>
        {status === "sent" ? (
          <p className="success-msg">
            Tak — forespørgslen er sendt. Jeg vender typisk tilbage på e-mail
            inden for et par hverdage.
          </p>
        ) : null}
      </form>
    </section>
  );
}
