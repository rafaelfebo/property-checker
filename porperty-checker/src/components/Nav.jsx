import SearchBox from "./SearchBox";
import "./nav.css";

function Nav({ query, setQuery }) {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <div className="container-fluid nav-container">
        <a className="navbar-brand" href="#">Property Checker</a>
        <div className="nav-search">
          <SearchBox query={query} setQuery={setQuery} />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
