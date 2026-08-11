import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { UserFormData } from "../types";

interface Props {
  title: string;
  initialData: UserFormData;
  onSubmit: (data: UserFormData) => Promise<void>;
  submitting: boolean;
  editMode?: boolean;
}

export default function UserForm({
  title,
  initialData,
  onSubmit,
  submitting,
  editMode = false,
}: Props) {
  const [form, setForm] = useState(initialData);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  const updateField = (field: keyof UserFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!form.name.trim() || !form.email.trim()) {
      setFormError("Name and email are required.");
      return;
    }

    try {
      await onSubmit(form);
      navigate("/");
    } catch {
      setFormError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="form-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">{editMode ? "Modify record" : "New record"}</p>
          <h1>{title}</h1>
        </div>
        <Link className="button secondary" to="/">
          Cancel
        </Link>
      </div>

      <form className="user-form" onSubmit={handleSubmit}>
        {formError && <div className="form-error">{formError}</div>}

        <div className="form-grid">
          <label>
            Full Name *
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g. John Doe"
              required
            />
          </label>

          <label>
            Username
            <input
              value={form.username}
              onChange={(e) => updateField("username", e.target.value)}
              placeholder="e.g. johndoe"
            />
          </label>

          <label>
            Email *
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="john@example.com"
              required
            />
          </label>

          <label>
            Phone
            <input
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+1 555 123 4567"
            />
          </label>

          <label className="full-width">
            Website
            <input
              value={form.website}
              onChange={(e) => updateField("website", e.target.value)}
              placeholder="example.com"
            />
          </label>
        </div>

        <div className="form-actions">
          <Link className="button secondary" to="/">
            Cancel
          </Link>
          <button className="button primary" disabled={submitting}>
            {submitting ? "Saving..." : editMode ? "Update User" : "Create User"}
          </button>
        </div>
      </form>
    </section>
  );
}