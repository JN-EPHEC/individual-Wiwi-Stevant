import { useEffect, useState } from "react";
import './App.css'

// Définition d'une interface pour le typage
// Sera couvert plus en profondeur en TH
interface User {
  id: number;
  firstName: string;
  lastName: string;
}

function App() {
  // 1. Définition de l'état
  const [data, setData] = useState<User[]>([]);
  // 2. Appel API au montage du composant
  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error(err));
  }, []);

  // 3. Rendu (JSX)
  return (
    <div className="app">
      <header className="app__header">
        <h1>Liste des utilisateurs</h1>
        <p className="app__subtitle">Voici la liste des personnes récupérées depuis l'API.</p>
      </header>

      {data.length === 0 ? (
        <p className="app__loading">Chargement des utilisateurs…</p>
      ) : (
        <ul className="user-list">
          {data.map((item) => (
            <li key={item.id} className="user-item">
              <span className="user-item__name">{item.firstName} {item.lastName}</span>
              <span className="user-item__id">#{item.id}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default App;
