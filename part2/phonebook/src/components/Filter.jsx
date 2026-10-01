const Filter = ({filterName,handleNameFilter}) => {
  return (
    <div>
      filter shown with <input
      value={filterName}
      onChange={handleNameFilter}
      />
    </div>
  )
}

export default Filter