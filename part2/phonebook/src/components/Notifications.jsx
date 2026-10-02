const Notifications = ({message}) => {
  const success = {
    color: 'green',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    backgroundColor: 'lightgray',
    fontSize: '30px',
    margin: '15px',
    marginLeft: '0px',
    padding: '10px',
    border: '5px solid green',
    borderRadius: '10px'
  }
  if (message === null) {
    return null
  }

  return (
  <div style={success}>
    {message}
  </div>)
}

export default Notifications