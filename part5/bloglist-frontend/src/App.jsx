import { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Button, Container, Box, } from '@mui/material'
import { Routes, Route, Link as RouterLink, useNavigate } from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const navigate = useNavigate()

  const createBlog = async (BlogObject) => {
    try {
      const newBlog = await blogService.create(BlogObject)
      setBlogs(blogs.concat(newBlog))
      setMessage({
        text: `a new blog ${newBlog.title} by ${newBlog.author} added!`,
        type: 'success',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage({ text: error.response?.data?.error, type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    navigate('/')
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
      } catch (error) {
        setMessage({ text: error.response?.data?.error, type: 'error' })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
    navigate('/')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      navigate('/')
      setMessage({
        text: `${user.name} logged in`,
        type: 'success'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch {
      setMessage({
        text: 'wrong credentials',
        type: 'error',
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const LogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
    navigate('/')
  }

  const addLike = async (blog) => {
    const newBlogObject = {
      ...blog,
      likes: blog.likes + 1,
    }
    const updatedBlog = await blogService.update(blog.id, newBlogObject)
    setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <AppBar position="static" sx={{ borderRadius: 1 }}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 500 }}
          >
            Blog App
          </Typography>

          <Button color="inherit" component={RouterLink} to="/">
            blogs
          </Button>

          {user ? (
            <>
              <Button color="inherit" component={RouterLink} to="/create">
                new blog
              </Button>
              <Button color="inherit" onClick={LogOut}>
                logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 2 }}>
        <Message message={message} />
      </Box>

      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              blogs={blogs}
              addLike={addLike}
              deleteBlog={deleteBlog}
              user={user}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginForm
              handleLogin={handleLogin}
              setUsername={setUsername}
              username={username}
              setPassword={setPassword}
              password={password}
            />
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blogs={blogs}
              addLike={addLike}
              deleteBlog={deleteBlog}
              user={user}
            />
          }
        />
        <Route
          path="/create"
          element={<BlogForm createBlog={createBlog} />}
        />
      </Routes>
    </Container>
  )
}

export default App