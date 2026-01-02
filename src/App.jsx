// App.jsx
import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Properties from "./components/Properties";
import FavoritesSidebar from "./components/FavoritesSidebar";
import Footer from "./components/Footer";
import "./components/favorites.css";

function App() {
  // Controlled value for the search input in `Nav` — used to filter `Properties`
  const [query, setQuery] = useState("");

  // Persistent list of favorite properties (kept in localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      // This prevents the app from crashing if the JSON is invalid or missing
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });

  // Sync favorites to localStorage whenever `favorites` changes to persist state
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add a property to favorites if it isn't already present
  // Validates the object and deduplicates by `id` before updating state
  function addFavorite(prop) {
    if (!prop || !prop.id) return;
    if (favorites.some(p => p.id === prop.id)) return;
    setFavorites(prev => [...prev, prop]);
  }

  // Remove a favorite by its property`id`
  function removeFavorite(id) {
    setFavorites(prev => prev.filter(p => p.id !== id));
  }

  // This function clears all favorites (used by a control in the sidebar)
  function clearFavorites() {
    setFavorites([]);
  }

  return (
    <>
      {/* Top navigation with search; `query` is passed as a controlled prop */}
      <Nav query={query} setQuery={setQuery} />
      <div className="app-layout">
        {/* Main content area: property listing. `id` can be used for drag/drop hooks */}
        <main className="main-area" id="main-drop-area">
          <Properties
            // filter text coming from `Nav`
            query={query}
            // current favorites for rendering favorite state on cards
            favorites={favorites}
            // handlers passed down so property cards can modify favorites
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        </main>

        {/* Sidebar showing saved favorites and quick actions */}
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
