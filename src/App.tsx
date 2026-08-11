import { useCallback, useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { userApi } from "./api";
import type { User, UserFormData } from "./types";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import UserForm from "./components/UserForm";

const emptyForm: UserFormData = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await userApi.getUsers();
      setUsers(data);
    } catch {
      setError("Unable to load users. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const createUser = async (data: UserFormData) => {
    setSaving(true);
    setError("");

    try {
      const created = await userApi.createUser(data);

      // JSONPlaceholder does not persist POST requests, so keep the
      // returned user in local React state to make the UI feel real.
      setUsers((current) => [
        { ...created, id: Date.now() },
        ...current,
      ]);
    } catch {
      setError("Could not create the user. Please try again.");
      throw new Error("Create failed");
    } finally {
      setSaving(false);
    }
  };

  const updateUser = async (id: number, data: UserFormData) => {
    setSaving(true);
    setError("");

    try {
      const updated = await userApi.updateUser(id, data);

      // PUT is simulated by JSONPlaceholder, so update the local list too.
      setUsers((current) =>
        current.map((user) =>
          user.id === id ? { ...user, ...updated, ...data } : user
        )
      );
    } catch {
      setError("Could not update the user. Please try again.");
      throw new Error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const deleteUser = async (id: number) => {
    setError("");

    try {
      await userApi.deleteUser(id);
      // JSONPlaceholder simulates DELETE, therefore remove it locally.
      setUsers((current) => current.filter((user) => user.id !== id));
    } catch {
      setError("Could not delete the user. Please try again.");
    }
  };

  const getUser = (id: number) => users.find((user) => user.id === id);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <Link className="brand" to="/">
            User<span>Hub</span>
          </Link>
          
        </div>
      </header>

      <main className="container page">
        {error && (
          <div className="alert" role="alert">
            <span>{error}</span>
            <button onClick={() => setError("")} aria-label="Dismiss error">
              ×
            </button>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Home
                users={users}
                loading={loading}
                onRetry={loadUsers}
                onDelete={deleteUser}
              />
            }
          />
          <Route
            path="/users/:id"
            element={
              <UserDetails
                getUser={getUser}
                onDelete={deleteUser}
              />
            }
          />
          <Route
            path="/users/new"
            element={
              <UserForm
                title="Create User"
                initialData={emptyForm}
                onSubmit={createUser}
                submitting={saving}
              />
            }
          />
          <Route
            path="/users/:id/edit"
            element={
              <EditRoute
                getUser={getUser}
                onSubmit={updateUser}
                submitting={saving}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function EditRoute({
  getUser,
  onSubmit,
  submitting,
}: {
  getUser: (id: number) => User | undefined;
  onSubmit: (id: number, data: UserFormData) => Promise<void>;
  submitting: boolean;
}) {
  // Route-level component keeps App focused on data/state management.
  const id = Number(location.pathname.split("/")[2]);
  const user = getUser(id);

  if (!user) {
    return (
      <section className="empty-state">
        <h1>User not found</h1>
        <Link className="button primary" to="/">
          Back to Users
        </Link>
      </section>
    );
  }

  const initialData: UserFormData = {
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
  };

  return (
    <UserForm
      title="Edit User"
      initialData={initialData}
      onSubmit={(data) => onSubmit(id, data)}
      submitting={submitting}
      editMode
    />
  );
}