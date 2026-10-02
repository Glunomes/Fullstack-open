import { useState, useEffect } from 'react'
import personsService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
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
    
    personsService
      .create(personObject)
      .then(returnedPersons => {
      setPersons(persons.concat(returnedPersons))
      setNewName('')
      setNewNumber('')
    })
  }

  const deletePerson = (person) => {
    if(window.confirm(`Delete ${person.name}`)) {
      personsService
        .deleteP(person.id)
        .then(() => {        
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
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
      <Persons personToShow={personToShow} deletePerson={deletePerson} /> 
    </div>
  )
}

export default App