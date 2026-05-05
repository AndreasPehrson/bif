import { useForm, ValidationError } from "@formspree/react";

type ContactFields = {
  name: string;
  email: string;
  message: string;
};

type ContactFormProps = {
  className?: string;
  messageRows?: number;
  variant?: "default" | "hero";
};

export function ContactForm({
  className = "contact-form",
  messageRows = 5,
  variant = "default"
}: ContactFormProps) {
  const [state, handleSubmit] = useForm<ContactFields>("xjglrkoo");

  if (state.succeeded) {
    return (
      <div className="form-alert form-alert-success" role="status">
        <p className="success-msg">
          Tak - beskeden er sendt. Jeg vender typisk tilbage på e-mail inden for
          et par hverdage.
        </p>
      </div>
    );
  }

  const nameField = (
    <label>
      Navn
      <input
        name="name"
        required
        autoComplete="name"
        disabled={state.submitting}
      />
      <ValidationError
        className="form-error"
        prefix="Navn"
        field="name"
        errors={state.errors}
      />
    </label>
  );

  const emailField = (
    <label>
      E-mail
      <input
        type="email"
        name="email"
        required
        autoComplete="email"
        disabled={state.submitting}
      />
      <ValidationError
        className="form-error"
        prefix="E-mail"
        field="email"
        errors={state.errors}
      />
    </label>
  );

  const messageField = (
    <label>
      Besked
      <textarea
        name="message"
        rows={messageRows}
        required
        disabled={state.submitting}
        placeholder="Skriv din besked her."
      />
      <ValidationError
        className="form-error"
        prefix="Besked"
        field="message"
        errors={state.errors}
      />
    </label>
  );

  return (
    <form
      className={className}
      onSubmit={handleSubmit}
      aria-busy={state.submitting}
    >
      {variant === "hero" ? (
        <div className="contact-form-split">{nameField}{emailField}</div>
      ) : (
        <>
          {nameField}
          {emailField}
        </>
      )}
      {messageField}
      <ValidationError
        className="form-error form-error-global"
        errors={state.errors}
      />
      <button
        type="submit"
        className="btn btn-primary contact-form-submit"
        disabled={state.submitting}
      >
        {state.submitting ? "Sender..." : "Send besked"}
      </button>
    </form>
  );
}
