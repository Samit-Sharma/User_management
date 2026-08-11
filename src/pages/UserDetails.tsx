import { Link, useParams } from "react-router-dom";
import type { User } from "../types";

interface Props {
  getUser: (id: number) => User | undefined;
  onDelete: (id: number) => Promise<void>;
}

export default function UserDetails({ getUser, onDelete }: Props) {
  const { id } = useParams();
  const user = getUser(Number(id));

  if (!user) {
    return (
      <section className="empty-state">
        <h1>User not found</h1>
        <p>The requested user does not exist in the current list.</p>
        <Link className="button primary" to="/">
          Back to Users
        </Link>
      </section>
    );
  }

  const address = user.address;
  const company = user.company;

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${user.name}?`)) return;
    await onDelete(user.id);
  };

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">User profile</p>
          <h1>{user.name}</h1>
        </div>
        <div className="actions">
          <Link className="button secondary" to="/">
            Back
          </Link>
          <Link className="button primary" to={`/users/${user.id}/edit`}>
            Edit
          </Link>
        </div>
      </div>

      <div className="details-grid">
        <article className="detail-card">
          <h2>Contact</h2>
          <Detail label="Email" value={user.email} />
          <Detail label="Phone" value={user.phone} />
          <Detail label="Website" value={user.website} />
        </article>

        <article className="detail-card">
          <h2>Account</h2>
          <Detail label="Username" value={user.username} />
          <Detail label="User ID" value={String(user.id)} />
        </article>

        <article className="detail-card">
          <h2>Address</h2>
          <Detail label="Street" value={address?.street ?? "Not available"} />
          <Detail label="Suite" value={address?.suite ?? "Not available"} />
          <Detail label="City" value={address?.city ?? "Not available"} />
          <Detail label="ZIP" value={address?.zipcode ?? "Not available"} />
        </article>

        <article className="detail-card">
          <h2>Company</h2>
          <Detail label="Name" value={company?.name ?? "Not available"} />
          <Detail
            label="Catchphrase"
            value={company?.catchPhrase ?? "Not available"}
          />
        </article>
      </div>

      <div className="delete-area">
        <button className="button danger" onClick={() => void handleDelete()}>
          Delete User
        </button>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}