import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '38-099-90-23-172'
    },
    { name: 'Beth',
      number: '38-099-90-23-172'
    },
    { name: 'Acara',
      number: '38-099-90-23-172'
    }
  ]) 
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
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filterName.toLowerCase())
  ) 

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input
        value={filterName}
        onChange={handleNameFilter}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange} />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          /> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {personToShow.map(person => (
            <li key={person.name}>{person.name} {person.number}</li>
          ))}
        </ul>
    </div>
  )
}

export default App