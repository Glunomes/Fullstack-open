const Persons = ({personToShow, deletePerson}) => {
  return (
    <ul>
      {personToShow.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </li>
      ))}
    </ul>
  )
}
export default Persons