import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [filterName, setFilter] = useState('')
  const [countries, setListOfCountries] = useState([])

  const handleNameFilter = (event) => setFilter(event.target.value)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
      const listOfCountries = response.data
      setListOfCountries(listOfCountries)
    })
  }, [])

  const filteredCountries = filterName 
  ? countries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase()))
  : countries

  return (
  <div>
    <Filter filterName={filterName} handleNameFilter={handleNameFilter} />
    <Countries filteredCountries={filteredCountries} filterName={filterName} />
  </div>
  )
}

export default App
