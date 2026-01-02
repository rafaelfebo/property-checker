// Properties.jsx
import data from "./properties.json";
import "./properties.css";

/* Shows the list of properties and lets users search, favorite, and drag items.
   Props:
   - `query`: current search text (from parent)
   - `favorites`: array of saved favorite properties 
   - `addFavorite` / `removeFavorite`: functions to change the favorites list */
function Properties({ query = "", favorites = [], addFavorite, removeFavorite }) {
  // Load the properties array from the JSON file, or use empty list
  const list = (data && data.properties) || [];

  // Make the search text lower-case and trim spaces so searching is forgiving
  const q = (query || "").toLowerCase().trim();

  /* If there's no search text, show everything. Otherwise, keep items that
     match the search in any important field (type, location, description, etc.). */
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

  /* Allow dropping favorite items (dragged from the sidebar) onto the main
     area — this handler allows those drops and signals that the move is allowed. */
  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  /* When something is dropped, check if it's a favorite item and remove it.
     This supports dragging a favorite from the sidebar into the main area
     as a quick way to remove it from saved favorites. */
  function handleDrop(e) {
    e.preventDefault();
    const favId = e.dataTransfer.getData("text/fav");
    if (favId) {
      removeFavorite(favId);
    }
  }

  // If no properties were loaded at all show this message
  if (!list.length) {
    return <div className="container"><p>No properties available.</p></div>;
  }

  /* If the search returned nothing, show this message including the text
     the user searched for so the user understand why nothing appears.*/
  if (!filtered.length) {
    return <div className="container"><p>No results for "{query}".</p></div>;
  }

  /* Toggle a property in the favorites list. If it's already saved, remove it;
     otherwise, add it. This is triggered by the star button on each card. */
  function toggleFavourite(prop) {
    if (favorites.some(f => f.id === prop.id)) {
      removeFavorite(prop.id);
    } else {
      addFavorite(prop);
    }
  }

  /* When the user starts dragging a property card, put the full property data
     into the drag payload so other parts of the UI (like the sidebar) can use it. */
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
          // Determine whether this property is currently marked as a favorite
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
                {/* Star button to add/remove favorites. Filled star = saved. */}
                <button
                  className={`fav-toggle ${isFav ? "fav-on" : "fav-off"}`} // ? and : form the JavaScript ternary operator: condition ? valueIfTrue : valueIfFalse
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

                {/* Short description of the property */}
                <p className="card-desc">{prop.description}</p>
                <div className="card-meta">
                  {/* Number of bedrooms */}
                  <span className="card-bedrooms">{prop.bedrooms} bed rooms</span>
                  {/* Price formatted with commas, or a fallback if not available */}
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
