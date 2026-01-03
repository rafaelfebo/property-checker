import React from "react";

function FavoritesSidebar({ favorites = [], addFavorite, removeFavorite, clearFavorites }) {
  /* Sidebar that shows the user's saved properties and lets the user manage them.
     It receives the list of saved items and functions to add,remove and clear them.
     The area also accepts dragged property cards so users can drop items to save them. */
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
        // Add the dropped property to the favourites list
        addFavorite(prop);
      } catch (err) {
        // If the dropped data isn't valid JSON, do nothing
      }
    }
  }

  /* When the user starts dragging a saved favourite, put its id into the
     drag payload so the drop target can identify which favourite was moved. */
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
        {/* Header showing how many favourites are saved and a clear action */}
        <h4>Favourites ({favorites.length})</h4>
        <button className="btn btn-primary btn-sm" onClick={clearFavorites} aria-label="Clear favourites">Clear</button>
      </div>

      {/* Area that lists saved favourites, or a helpful empty message */}
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
            {/* Thumbnail image for the favourite; uses a placeholder if none provided */}
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
              {/* Button to remove this property from favourites */}
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
