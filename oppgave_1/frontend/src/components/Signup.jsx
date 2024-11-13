
import { useState } from "react";
import { useRouter } from "next/navigation";

function SignUp() {
    const [success, setSuccess] = useState(false);
    const [formError, setFormError] = useState(false);
    const [fields, setFields] = useState({
      name: "",
      email: "",
      admin: false,
    });
    const router = useRouter();
  
    const formIsValid = Object.values(fields).filter((val) => val?.length === 0);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setFormError(false);
      setSuccess(false);
      if (formIsValid.length === 0) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/kurs");
        }, 500);
      } else {
        setFormError(true);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFields((prev) => ({ ...prev, [name]: value }));
    };
  
    return (
      <section className="sign_up_container" data-testid="sign_up">
        <h2 className="title" data-testid="title">
          Ny bruker
        </h2>
        <form className="form" data-testid="form" onSubmit={handleSubmit} noValidate>
          <label className="form_label" htmlFor="name">
            <span className="label_text">Navn*</span>
            <input
              className="input"
              data-testid="form_name"
              type="text"
              name="name"
              id="name"
              value={fields?.name}
              onChange={handleChange}
            />
          </label>
          <label className="form_label" htmlFor="email">
            <span className="label_text">Epost*</span>
            <input
              className="input"
              data-testid="form_email"
              type="email"
              name="email"
              id="email"
              value={fields?.email}
              onChange={handleChange}
            />
          </label>
          <label className="checkbox_label" htmlFor="admin">
            <input
              className="checkbox"
              data-testid="form_admin"
              type="checkbox"
              name="admin"
              id="admin"
              onChange={handleChange}
              checked={fields?.admin}
            />
            <span className="checkbox_text">Admin</span>
          </label>
          <button
            className="submit_button"
            data-testid="form_submit"
            type="submit"
          >
            Lag ny bruker
          </button>
          {formError ? (
            <p className="error_message" data-testid="form_error">
              Fyll ut alle felter med *
            </p>
          ) : null}
          {success ? (
            <p
              className="success_message"
              data-testid="form_success"
            >
              Skjema sendt
            </p>
          ) : null}
        </form>
      </section>
    );
  }
  export default SignUp;