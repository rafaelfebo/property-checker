import './nav.css'

// Simple component that shows a search box.
// It does not keep its own text — the current text (`query`) and
// the function to change it (`setQuery`) are provided by the parent.
function SearchBox({ query, setQuery }) {
  return (
    <div className='container-fluid'>
        {/* Makes the input behave nicely on different screen sizes */}
        <input
          type="text"
          // The text shown in the box comes from the parent component
          value={query}
          // When the user types, call `setQuery` so the parent can save the text
          onChange={e => setQuery(e.target.value)}
          // A place holder text to show to the user that the box is empty
          placeholder="Search..."
        />
    </div>
  )
}

export default SearchBox