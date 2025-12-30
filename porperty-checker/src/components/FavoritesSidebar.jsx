// FavoritesSidebar.jsx
import React from "react";

function FavoritesSidebar({ favorites = [], addFavorite, removeFavorite, clearFavorites }) {
  // accept drops from property cards (they set 'application/json' with full prop)
  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  function handleDrop(e) {
    e.preventDefault();
    const json = e.dataTransfer.getData("application/json");
    if (json) {
      try {
        const prop = JSON.parse(json);
        addFavorite(prop);
      } catch (err) {
        // ignore
      }
    }
  }

  // when dragging a favourite out, we set a "text/fav" id
  function onFavDragStart(e, id) {
    e.dataTransfer.setData("text/fav", id);
    e.dataTransfer.effectAllowed = "move";
  }

  return (
    <aside
      className="favorites-sidebar"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      aria-label="Favourites"
    >
      <div className="fav-header">
        <h4>Favourites ({favorites.length})</h4>
        <button className="btn-clear" onClick={clearFavorites} aria-label="Clear favourites">Clear</button>
      </div>

      <div className="fav-list" role="list">
        {favorites.length === 0 && <p className="fav-empty">No favourites yet — drag properties here or click the star.</p>}

        {favorites.map(f => (
          <div
            key={f.id}
            className="fav-item"
            draggable
            onDragStart={(e) => onFavDragStart(e, f.id)}
            role="listitem"
            aria-grabbed="false"
          >
            <img
              className="fav-thumb"
              src={ f.picture ? (f.picture.startsWith('http') ? f.picture : `${f.picture}`) : '/images/placeholder.png' }
              alt={`${f.type} in ${f.location}`}
            />
            <div className="fav-meta">
              <div className="fav-title">{f.type}</div>
              <div className="fav-location">{f.location}</div>
              <div className="fav-price">{f.price ? `£${f.price.toLocaleString()}` : 'Price N/A'}</div>
            </div>

            <div>
              <button className="btn-remove" onClick={() => removeFavorite(f.id)} aria-label={`Remove ${f.id}`}>
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fav-description">
        <small>Drag a property card here to add. Drag a favourite back to the results area to remove it.</small>
      </div>
    </aside>
  );
}

export default FavoritesSidebar;
