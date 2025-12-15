import data from "./properties.json";
import { useState } from "react";


function SearchBox() {
  const [query, setQuery] = useState("");

  const filteredProperties = data.properties.filter((property) =>
    property.type.toLowerCase().includes(query.toLowerCase()) ||
    property.location.toLowerCase().includes(query.toLowerCase()) ||
    property.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search properties..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {filteredProperties.map((property) => (
          <li key={property.id}>
            <h3>{property.type}</h3>
            <p>{property.location}</p>
            <p>£{property.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBox;