import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url,
    })

    setUrl('')
    setAuthor('')
    setTitle('')
  }

  return (
    <Box>
      <Typography
        component="h2"
        sx={{
          fontFamily: 'serif',
          fontSize: '1.75rem',
          fontWeight: 700,
          color: '#111',
          mb: 3,
        }}
      >
        create new
      </Typography>

      <Box
        component="form"
        onSubmit={addBlog}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 280,
          gap: 2,
        }}
      >
        <TextField
          id="title"
          label="title"
          size="small"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

        <TextField
          id="author"
          label="author"
          size="small"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />

        <TextField
          id="url"
          label="url"
          size="small"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />

        <Box sx={{ mt: 1 }}>
          <Button type="submit" variant="contained" color="primary">
            CREATE
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default BlogForm