import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleNameFilter = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    for (let person of persons) {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`)
        return
      }
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    axios
      .post("http://localhost:3001/persons", personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const personToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filterName.toLowerCase())
  ) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleNameFilter={handleNameFilter} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons personToShow={personToShow} /> 
    </div>
  )
}

export default App