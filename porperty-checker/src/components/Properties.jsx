import data from "./properties.json";
import "./properties.css";

function Properties({ query = "" }) {
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

  if (!list.length) {
    return <div className="container"><p>No properties available.</p></div>;
  }

  if (!filtered.length) {
    return <div className="container"><p>No results for "{query}".</p></div>;
  }

  return (
    <main className="container">
      <div className="properties-grid">
        {filtered.map(prop => (
          <article key={prop.id} className="property-card" role="article" aria-label={`${prop.type} in ${prop.location}`}>
            <div className="card-media">
              <img
                src={
                  prop.picture
                    ? (prop.picture.startsWith('/') ? prop.picture : `/${prop.picture}`)
                    : './images/placeholder.png'
                }
                alt={`${prop.type} in ${prop.location}`}
                className="card-image"
              />
            </div>

            <div className="card-body">
              {/* title kept only here */}
              <h3 className="card-title">
                {prop.type} <span className="card-location">— {prop.location}</span>
              </h3>

              <p className="card-desc">{prop.description}</p>
              <div className="card-meta">
                <span className="card-bedrooms">{prop.bedrooms} bd</span>
                <span className="card-price">{prop.price ? `£${prop.price.toLocaleString()}` : 'Price N/A'}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Properties;
