// Properties.jsx
import data from "./properties.json";
import "./properties.css";

function Properties({ query = "", favorites = [], addFavorite, removeFavorite }) {
  const list = (data && data.properties) || [];
  const q = (query || "").toLowerCase().trim();

  const filtered = q === ""
    ? list
    : list.filter(prop => {
        return [
          prop.id,
          prop.type,
          prop.location,
          prop.description,
          prop.tenure,
          String(prop.bedrooms),
          String(prop.price)
        ].some(field => field && field.toLowerCase().includes(q));
      });

  // allow dropping favourite items (dragged from sidebar) onto the main area to remove them
  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleDrop(e) {
    e.preventDefault();
    const favId = e.dataTransfer.getData("text/fav");
    if (favId) {
      removeFavorite(favId);
    }
  }

  if (!list.length) {
    return <div className="container"><p>No properties available.</p></div>;
  }

  if (!filtered.length) {
    return <div className="container"><p>No results for "{query}".</p></div>;
  }

  // helper to toggle favourites via button
  function toggleFavourite(prop) {
    if (favorites.some(f => f.id === prop.id)) {
      removeFavorite(prop.id);
    } else {
      addFavorite(prop);
    }
  }

  function onCardDragStart(e, prop) {
    // set full property JSON so the sidebar can add it
    e.dataTransfer.setData("application/json", JSON.stringify(prop));
    e.dataTransfer.effectAllowed = "copy";
  }

  return (
    <main
      className="container properties-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      id="properties-drop-area"
    >
      <div className="properties-grid">
        {filtered.map(prop => {
          const isFav = favorites.some(f => f.id === prop.id);
          return (
            <article
              key={prop.id}
              className="property-card"
              role="article"
              aria-label={`${prop.type} in ${prop.location}`}
              draggable
              onDragStart={(e) => onCardDragStart(e, prop)}
            >
              <div className="card-media">
                <img
                  src={ prop.picture ? (prop.picture.startsWith('http') ? prop.picture : `${prop.picture}`) : '/images/placeholder.png' }
                  alt={`${prop.type} in ${prop.location}`}
                />
                <button
                  className={`fav-toggle ${isFav ? "fav-on" : "fav-off"}`}
                  onClick={() => toggleFavourite(prop)}
                  aria-pressed={isFav}
                  aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
                >
                  {isFav ? "★" : "☆"}
                </button>
              </div>

              <div className="card-body">
                <h3 className="card-title">
                  {prop.type} <span className="card-location">— {prop.location}</span>
                </h3>

                <p className="card-desc">{prop.description}</p>
                <div className="card-meta">
                  <span className="card-bedrooms">{prop.bedrooms} bed rooms</span>
                  <span className="card-price">{prop.price ? `£${prop.price.toLocaleString()}` : 'Price N/A'}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

export default Properties;
