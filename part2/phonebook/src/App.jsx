import { useState, useEffect } from 'react'
import personsService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notifications from './components/Notifications'

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
  const [message, setMessage] = useState(null)

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleNameFilter = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    for (let person of persons) {
      if (person.name === newName) {
        if(window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
          return updatePerson(person.id)
        }
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
      setMessage({text: `Added new contact: ${newName}`, type: 'success'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    })
  }

  const updatePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const changedNumberPerson = {
      ...person,
      number: newNumber
    }
    personsService
      .updateNumber(person.id,changedNumberPerson)
      .then(updatedPerson => {
      setPersons(persons.map(person => person.id === id ? updatedPerson : person))
      setMessage({text:`Number has changed for ${newName}`, type: 'success'})
      setTimeout(() => {
        setMessage(null)
      }, 5000) 
      })
      .catch(() => {
        setMessage({text: `Information of ${newName} has already been removed from server`, type: 'error'})
        setPersons(persons.filter(p => p.id !== id))
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .finally (() => {
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
      <Notifications message={message} />
      <Filter filterName={filterName} handleNameFilter={handleNameFilter} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons personToShow={personToShow} deletePerson={deletePerson} /> 
    </div>
  )
}

export default App