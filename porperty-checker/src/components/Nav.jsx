import SearchBox from "./SearchBox";
import "./nav.css";

/* It receives `query` (the current search text) and `setQuery` (a function
to change that text) from the parent component so the search state lives
at the app level and can be shared with other parts of the UI. */
function Nav({ query, setQuery }) {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <div className="container-fluid nav-container">
        {/* App title/brand on the left */}
        <a className="navbar-brand" href="#">Property Checker</a>
        <div className="nav-search">
          {/* The search box is a separate component. We pass the current
              text and the updater function so it can show and change the value. */}
          <SearchBox query={query} setQuery={setQuery} />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
