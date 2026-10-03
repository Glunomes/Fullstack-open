const Country = ({country}) => {
  const languages = country.languages 
  ? Object.values(country.languages)
  : ['Languages are missing']

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital?.join(', ') || 'is not defined'}</p>
      <p>Area {country.area} km²</p>
      <h2>Languages</h2>
      <ul>{languages.map(language => 
        <li key={language}>
          {language}
        </li>)}
      </ul>
      <img src={country.flags?.png} 
      alt={country.flags?.alt || `Flag of ${country.name.common}`} 
      />
    </div>
  )
}

export default Country