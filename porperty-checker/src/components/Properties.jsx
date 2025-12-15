// Properties.jsx
import data from "./properties.json";

function Properties({ query = "" }) {
  // Make safe defaults
  const list = (data && data.properties) || [];

  const q = (query || "").toLowerCase().trim();

  const filtered = q === ""
    ? list
    : list.filter(prop => {
        // check a few text fields that actually exist in your JSON
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

  if (!list.length) {
    return <div>No properties available.</div>;
  }

  if (!filtered.length) {
    return <div>No results for "{query}".</div>;
  }

  return (
    <main>
      <div className="properties-grid">
        {filtered.map(prop => (
          <article key={prop.id} className="property-card">
            <h3>{prop.type} — {prop.location}</h3>
            <p>{prop.description}</p>
            <p>
              <strong>Bedrooms:</strong> {prop.bedrooms} {" "}
            </p>
            <p>
              <strong>Price:</strong> £{prop.price.toLocaleString()}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Properties;
