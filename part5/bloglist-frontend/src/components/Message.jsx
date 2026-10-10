const Message = ({ message }) => {
  const messageStyle = {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    backgroundColor: 'lightgray',
    fontSize: '30px',
    margin: '15px',
    marginLeft: '0px',
    padding: '10px',
    borderRadius: '10px'
  }

  const error = {
    ...messageStyle,
    color: 'red',
    border: '5px solid red',
  }

  const success = {
    ...messageStyle,
    color: 'green',
    border: '5px solid green',
  }

  if (message === null) {
    return null
  }

  const { text, type } = message

  return (
    <div style={type === 'success' ? success : error}>
      {text}
    </div>
  )
}

export default Message