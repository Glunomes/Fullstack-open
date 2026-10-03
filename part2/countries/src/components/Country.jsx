import Weather from "./Weather"

const Country = ({country}) => {
  const languages = country.languages 
  ? Object.values(country.languages)
  : ['Languages are missing']

  const nameOfCountry = country.name.common

  return (
    <div>
      <h1>{nameOfCountry}</h1>
      <p>Capital {country.capital?.join(', ') || 'is not defined'}</p>
      <p>Area {country.area} km²</p>
      <h2>Languages</h2>
      <ul>{languages.map(language => 
        <li key={language}>
          {language}
        </li>)}
      </ul>
      <img src={country.flags?.png} 
      alt={country.flags?.alt || `Flag of ${nameOfCountry}`} 
      />
      <Weather country={country} />
    </div>
  )
}

export default Country