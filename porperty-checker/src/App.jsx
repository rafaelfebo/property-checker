// App.jsx
import { useState } from "react";
import Nav from "./components/Nav";
import Properties from "./components/Properties";
import Footer from "./components/Footer";

function App() {
  const [query, setQuery] = useState("");

  return (
    <>
      <Nav query={query} setQuery={setQuery} />
      <Properties query={query} />
      <Footer />
    </>
  );
}

export default App;
