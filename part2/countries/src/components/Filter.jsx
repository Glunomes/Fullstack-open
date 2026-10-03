const Filter = ({filterName,handleNameFilter}) => {
  return (
    <div>
      filter <input
      value={filterName}
      onChange={handleNameFilter}
      />
    </div>
  )
}

export default Filter