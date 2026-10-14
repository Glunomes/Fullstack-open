import { Alert } from '@mui/material'

const Message = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <Alert severity={message.type}>
      {message.text}
    </Alert>
  )
}

export default Message