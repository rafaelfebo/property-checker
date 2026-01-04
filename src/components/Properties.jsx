import { useState } from "react";
import data from "./properties.json";
import "./properties.css";
import PropertyModal from "./PropertyModal"; // NEW import

function Properties({ query = "", favorites = [], addFavorite, removeFavorite }) {
  // `selectedProp` holds the property the user clicked to view more details
  const [selectedProp, setSelectedProp] = useState(null);

  // Load the array of properties from the JSON file (or use an empty list)
  const list = (data && data.properties) || [];
  // Normalize the search text to make matching easier and case-insensitive
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
          prop.bedr,
          String(prop.bedrooms),
          String(prop.price)
        ].some(field => field && field.toLowerCase().includes(q));
      });

  // Allow dropping items into the main area (used to remove favourites)
  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  // When something is dropped, check if it is a favourite id and remove it
  function handleDrop(e) {
    e.preventDefault();
    const favId = e.dataTransfer.getData("text/fav");
    if (favId) {
      removeFavorite(favId);
    }
  }

  // Friendly messages for empty state or no search results
  if (!list.length) {
    return <div className="container"><p>No properties available.</p></div>;
  }

  if (!filtered.length) {
    return <div className="container"><p>No results for "{query}".</p></div>;
  }

  // Toggle a property as a favourite: add it if not present, remove if it is
  function toggleFavourite(prop) {
    if (favorites.some(f => f.id === prop.id)) {
      removeFavorite(prop.id);
    } else {
      addFavorite(prop);
    }
  }

  /* When starting to drag a property card, put its data into the drag payload
    so the sidebar can read it and add it as a favourite if dropped there. */
  function onCardDragStart(e, prop) {
    e.dataTransfer.setData("application/json", JSON.stringify(prop));
    e.dataTransfer.effectAllowed = "copy";
  }

  return (
    <>
      <main
        className="container properties-container"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        id="properties-drop-area"
      >
        <div className="properties-grid">
          {filtered.map(prop => {
            // Check if the current property is saved in the favourites list
            const isFav = favorites.some(f => f.id === prop.id);
            return (
              <article
                key={prop.id}
                className="property-card"
                role="article"
                aria-label={`${prop.type} in ${prop.location}`}
                draggable
                onDragStart={(e) => onCardDragStart(e, prop)}
                onClick={() => setSelectedProp(prop)} // open modal on click
              >
                <div className="card-media">
                  {/* Show picture if available, otherwise a placeholder image */}
                  <img
                    src={ prop.picture ? (prop.picture.startsWith('http') ? prop.picture : `${prop.picture}`) : '/images/placeholder.png' }
                    alt={`${prop.type} in ${prop.location}`}
                  />
                  {/* Star button: clicking adds/removes favourite. stopPropagation
                      prevents the click from also opening the modal. */}
                  <button
                    className={`fav-toggle ${isFav ? "fav-on" : "fav-off"}`}
                    onClick={(e) => { e.stopPropagation(); toggleFavourite(prop); }}
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

                  {/* Short description and a bottom row with bedrooms and price */}
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

      {/* Modal - shows when a property is selected */}
      {selectedProp && (
        <PropertyModal
          prop={selectedProp}
          onClose={() => setSelectedProp(null)}
        />
      )}
    </>
  );
}

export default Properties;
