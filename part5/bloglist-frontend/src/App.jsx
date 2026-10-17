import { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Button, Container, Box, } from '@mui/material'
import { Routes, Route, Link as RouterLink, useNavigate } from 'react-router-dom'
import { useBlogs } from './hooks/useBlogs'

import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import useNotification from './hooks/useNotification'
import Notification from './components/Notification'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const { setNotification } = useNotification()

  const { blogs, isPending, isError, addBlog, updateVote, deleteBlog } = useBlogs()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const navigate = useNavigate()

  if(isPending) {
    return <div>loading data...</div>
  }

  if(isError) {
    return <div>blog service not available due to problems in server</div>
  }

  const createBlog = (BlogObject) => {

    addBlog(BlogObject, {
      onSuccess: (createdBlog) => {
        setNotification({
          text: `a new blog ${createdBlog.title} by ${createdBlog.author} added!`,
          type: 'success',
        })
        navigate('/')
      },
      onError: (error) => {
        setNotification({ text: error.message, type: 'error' })
      }
    })
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id, {
        onSuccess: () => {
          setNotification({
            text: `blog ${blog.title} has been deleted`,
            type: 'success'
          })
          navigate('/')
        },
        onError: (error) => {
          setNotification({ text: error.message, type: 'error' })
        }
      })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      navigate('/')
      setNotification({
        text: `${user.name} logged in`,
        type: 'success'
      })
      setUsername('')
      setPassword('')
    } catch {
      setNotification({
        text: 'wrong credentials',
        type: 'error',
      })
    }
  }

  const LogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
    navigate('/')
  }

  const addLike = (blog) => {
    updateVote(blog, {
      onSuccess: (updatedBlog) => {
        setNotification({
          text: `blog ${updatedBlog.title} by ${updatedBlog.author} was liked!`,
          type: 'success',
        })
      },
      onError: (error) => {
        setNotification({ text: error.message, type: 'error' })
      }
    })
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
        <Notification/>
      </Box>

      <Routes>
        <Route
          path="/"
          element={
            <BlogList/>
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
              deleteBlog={handleDeleteBlog}
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