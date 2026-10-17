import { Alert } from '@mui/material'
import useNotification from '../hooks/useNotification'
import { useEffect } from 'react'

const Notification = () => {
  const { notification, setNotification } = useNotification()

  useEffect(() => {
    if(!notification) return

    const timer = setTimeout(() => {
      setNotification(null)
    }, 5000)

    return () => clearTimeout(timer)
  }, [notification, setNotification])

  if (!notification) return null

  return (
    <Alert severity={notification.type}>
      {notification.text}
    </Alert>
  )
}

export default Notification