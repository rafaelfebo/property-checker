// App.jsx
import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Properties from "./components/Properties";
import FavoritesSidebar from "./components/FavoritesSidebar";
import Footer from "./components/Footer";
import "./components/favorites.css"; // sidebar styles + responsive rules

function App() {
  const [query, setQuery] = useState("");

  // favourites stored as array of property objects
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(prop) {
    if (!prop || !prop.id) return;
    if (favorites.some(p => p.id === prop.id)) return;
    setFavorites(prev => [...prev, prop]);
  }

  function removeFavorite(id) {
    setFavorites(prev => prev.filter(p => p.id !== id));
  }

  function clearFavorites() {
    setFavorites([]);
  }

  return (
    <>
      <Nav query={query} setQuery={setQuery} />
      <div className="app-layout">
        <main className="main-area" id="main-drop-area">
          <Properties
            query={query}
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        </main>

        <FavoritesSidebar
          favorites={favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          clearFavorites={clearFavorites}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;
