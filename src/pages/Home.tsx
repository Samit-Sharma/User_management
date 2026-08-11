import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import type { User } from "../types";

interface Props {
  users: User[];
  loading: boolean;
  onRetry: () => void;
  onDelete: (id: number) => Promise<void>;
}

export default function Home({ users, loading, onRetry, onDelete }: Props) {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>User Management</h1>
          <p className="hero-copy">
            Create, view, update, and delete users with a responsive React UI.
          </p>
        </div>
        <Link className="button primary" to="/users/new">
          + Add User
        </Link>
      </section>

      <section className="card">
        <div className="card-heading">
          <div>
            <h2>Users</h2>
            <p>{loading ? "Fetching records..." : `${users.length} users found`}</p>
          </div>
        </div>

        {loading ? (
          <Spinner text="Loading users..." />
        ) : users.length === 0 ? (
          <div className="empty-state">
            <h3>No users found</h3>
            <p>Try loading the users again.</p>
            <button className="button primary" onClick={onRetry}>
              Retry
            </button>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td data-label="Name">
                      <Link className="user-name" to={`/users/${user.id}`}>
                        {user.name}
                      </Link>
                      <span className="username">@{user.username}</span>
                    </td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="Phone">{user.phone}</td>
                    <td data-label="Actions">
                      <div className="actions">
                        <Link
                          className="button small secondary"
                          to={`/users/${user.id}/edit`}
                        >
                          Edit
                        </Link>
                        <button
                          className="button small danger"
                          onClick={() => {
                            if (window.confirm(`Delete ${user.name}?`)) {
                              void onDelete(user.id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}