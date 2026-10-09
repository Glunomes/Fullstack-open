const Message = ({message}) => {
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

  if (message === null) {
    return null
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
} 

export default Message