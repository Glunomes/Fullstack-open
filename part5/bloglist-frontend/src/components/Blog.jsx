import { useParams } from 'react-router-dom'
import { Box, Button, Link, Paper, Typography } from '@mui/material'

const Blog = ({ blogs, addLike, deleteBlog, user }) => {
  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  const showDeleteButton = blog.user?.username === user?.username

  return (
    <Paper elevation={2} sx={{ p: 4, mt: 3, maxWidth: 600 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
        {blog.title}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
        by {blog.author}
      </Typography>

      <Link
        href={blog.url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ display: 'block', mb: 1.5 }}
      >
        {blog.url}
      </Link>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Added by {blog.user?.name}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Typography variant="body1" sx={{ fontWeight: 500, mr: 0.5 }}>
          {blog.likes} likes
        </Typography>

        {user && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => addLike(blog)}
          >
            LIKE
          </Button>
        )}

        {showDeleteButton && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => deleteBlog(blog)}
          >
            REMOVE
          </Button>
        )}
      </Box>
    </Paper>
  )
}

export default Blog