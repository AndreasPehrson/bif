import { useForm, ValidationError } from "@formspree/react";

type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const [state, handleSubmit] = useForm<ContactFields>("xzdooabd");

  if (state.succeeded) {
    return (
      <div className="form-alert form-alert-success" role="status">
        <p className="success-msg">
          Tak - beskeden er landet hos mig. Jeg glæder mig til at læse den og vender tilbage på
          e-mail inden for et par hverdage.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-busy={state.submitting}>
      <div className="contact-form-row">
        <label className="contact-field">
          <span className="contact-field-label">Dit navn</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            disabled={state.submitting}
          />
          <ValidationError
            className="form-error"
            prefix="Dit navn"
            field="name"
            errors={state.errors}
          />
        </label>

        <label className="contact-field">
          <span className="contact-field-label">Din e-mail</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            disabled={state.submitting}
          />
          <ValidationError
            className="form-error"
            prefix="Din e-mail"
            field="email"
            errors={state.errors}
          />
        </label>
      </div>

      <label className="contact-field">
        <span className="contact-field-label">Din besked</span>
        <textarea
          name="message"
          rows={5}
          required
          disabled={state.submitting}
          placeholder="Fx en idé, et tidspunkt eller bare et hej - skriv løst."
        />
        <ValidationError
          className="form-error"
          prefix="Din besked"
          field="message"
          errors={state.errors}
        />
      </label>

      <ValidationError className="form-error form-error-global" errors={state.errors} />

      <button
        type="submit"
        className="contact-form-submit"
        disabled={state.submitting}
      >
        {state.submitting ? "Sender..." : "Send besked"}
      </button>
    </form>
  );
}
