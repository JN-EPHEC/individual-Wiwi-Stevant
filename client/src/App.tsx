import { FormEvent, useEffect, useState } from "react";
import "./App.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadUsers() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api");
      if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function addUser(event: FormEvent) {
    event.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;

    try {
      const res = await fetch("http://localhost:3000/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
      setFirstName("");
      setLastName("");
      await loadUsers();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function deleteUser(id: number) {
    try {
      const res = await fetch(`http://localhost:3000/api/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
      await loadUsers();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="app">
      <div className="card">
        <div className="card-header">
          <h1>Liste des Étudiants</h1>
        </div>

        <div className="card-body">
          <form className="mb-4" onSubmit={addUser}>
            <fieldset className="form-fieldset">
              <legend>Ajouter un Étudiant</legend>
              <div className="row">
                <div className="col">
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-control"
                    placeholder="Prénom"
                    required
                  />
                </div>
                <div className="col">
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-control"
                    placeholder="Nom"
                    required
                  />
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-success">
                    Ajouter
                  </button>
                </div>
              </div>
            </fieldset>
          </form>

          {error ? <div className="alert">Erreur : {error}</div> : null}
          {loading ? (
            <div className="alert">Chargement...</div>
          ) : (
            <ul className="list-group">
              {users.map((user) => (
                <li key={user.id} className="list-group-item">
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                  <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>
                    X
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
