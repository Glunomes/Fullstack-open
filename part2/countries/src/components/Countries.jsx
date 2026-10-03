import Country from "./Country"

const Countries = ({filteredCountries, filterName, setFilter}) => {
  if (!filterName) {
    return <p>Filter is empty, type something</p>
  }
  if (filteredCountries.length === 0) {
    return <p>No matches found</p>
  }
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  } 
  return (
  <div>
    <p>Found Countries:</p>
    <ul>
      {filteredCountries.map(country => (
        <li key={country.name.common}>
          {country.name.common}{' '}
          <button onClick={() => setFilter(country.name.common)}>
             Show
          </button>
        </li>
        ))}
    </ul>
  </div>
  )
}


export default Countries