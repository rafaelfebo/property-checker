import { useEffect, useState } from "react";
import "./propertyModal.css";

export default function PropertyModal({ prop, onClose }) {
  // Which tab the user is viewing in the modal: details, floor plan, or map
  const [activeTab, setActiveTab] = useState("details"); // "details" | "floor" | "map"
  // Index of the main gallery image shown on the left side
  const [mainIndex, setMainIndex] = useState(0);

  useEffect(() => {
    setActiveTab("details");
    setMainIndex(0);
  }, [prop]);

  if (!prop) return null;

  // Build an images array of length >= 6 using available data or placeholders
  const placeholder = "/images/placeholder.png";
  const imagesFromProp = Array.isArray(prop.images) ? prop.images : (prop.picture ? [prop.picture] : []);
  const images = [];
  /* list of six images to show in the gallery.
     If the property provides fewer than six, we reuse available images */
  for (let i = 0; i < 6; i++) {
    images.push(imagesFromProp[i] ?? imagesFromProp[i % imagesFromProp.length] ?? placeholder);
  }

  let mapSrc;
    /* Build a URL to embed Google Maps for the property's location.
       Encode the location/postcode so spaces and special characters are safe in the URL. */
    const q = encodeURIComponent([prop.location, prop.postcode].filter(Boolean).join(" "));
    mapSrc = `https://www.google.com/maps?q=${q || encodeURIComponent(prop.location)}&z=15&output=embed`;
  

  const description = prop.description || "No description available.";

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${prop.type} details`}>
      <div className="modal-window">
        <header className="modal-header">
          <h2>{prop.type} — {prop.location}</h2>
          <button className="btn btn-primary btn-sm" onClick={onClose} aria-label="Close details">X</button>
        </header>

        <div className="modal-body">
          <div className="modal-left">
            {/* Gallery main image: shows the currently selected photo */}
            <div className="gallery-main">
              <img src={ images[mainIndex].startsWith("http") ? images[mainIndex] : `${images[mainIndex]}` } alt={`${prop.type} image ${mainIndex+1}`} />
            </div>

            {/* Thumbnails: clicking a small image updates the main image on the left */}
            <div className="gallery-thumbs">
              {images.map((src, i) => (
                <button
                  key={i}
                  className={`thumb-btn ${i === mainIndex ? "active" : ""}`}
                  onClick={() => setMainIndex(i)}
                  aria-label={`Show image ${i+1}`}
                >
                  <img src={ src.startsWith("http") ? src : `${src}` } alt={`thumbnail ${i+1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="modal-right">
            {/* Tabs: switch between details, floor plan, and map views */}
            <nav className="modal-tabs" role="tablist" aria-label="Property tabs">
              <button
                role="tab"
                aria-selected={activeTab === "details"}
                className={activeTab === "details" ? "tab-active" : ""}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "floor"}
                className={activeTab === "floor" ? "tab-active" : ""}
                onClick={() => setActiveTab("floor")}
              >
                Floor Plan
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "map"}
                className={activeTab === "map" ? "tab-active" : ""}
                onClick={() => setActiveTab("map")}
              >
                Map
              </button>
            </nav>

            {/* Tab panel: only the active section is rendered below */}
            <div className="tab-panel">
              {activeTab === "details" && (
                <section>
                  <h3>Full description</h3>
                  <p className="long-desc">{description}</p>

                  <ul className="prop-meta-list">
                    <li><strong>Price:</strong> {prop.price ? `£${Number(prop.price).toLocaleString()}` : "N/A"}</li>
                    <li><strong>Bedrooms:</strong> {prop.bedrooms ?? "N/A"}</li>
                    <li><strong>Tenure:</strong> {prop.tenure ?? "N/A"}</li>
                    <li><strong>Location:</strong> {prop.location ?? "N/A"} {prop.postcode ? `(${prop.postcode})` : ""}</li>
                    {prop.features && <li><strong>Features:</strong> {prop.features.join(", ")}</li>}
                  </ul>
                </section>
              )}

              {/* Floor plan tab: shows an image if available, otherwise a message */}
              {activeTab === "floor" && (
                <section>
                  <h3>Floor plan</h3>
                  {prop.floorPlan ? (
                    <img className="floorplan-img" src={ prop.floorPlan.startsWith("http") ? prop.floorPlan : `${prop.floorPlan}` } alt="Floor plan" />
                  ) : (
                    <div className="floorplan-placeholder">No floor plan available.</div>
                  )}
                </section>
              )}

              {/* Map tab: shows an embedded Google map centered on the property */}
              {activeTab === "map" && (
                <section>
                  <h3>Location</h3>
                  <div className="map-wrap" aria-hidden={false}>
                    <iframe
                      title="Google map"
                      src={mapSrc}
                      frameBorder="0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        <footer className="modal-footer">
          {/* Close button: calls the parent `onClose` function to hide the modal */}
          <button className="btn btn-primary btn-sm" onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  );
}
