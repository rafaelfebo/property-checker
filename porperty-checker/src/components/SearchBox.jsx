import './nav.css'

function SearchBox({ query, setQuery }) {
  return (
    <div className='container-fluid'>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
        />
    </div>
  )
}

export default SearchBox