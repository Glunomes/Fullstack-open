import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Toggable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }
  }, [])

  const createBlog = async (BlogObject)  => {
    try {
      const newBlog = await blogService.create(BlogObject)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      setMessage({text: `a new blog ${newBlog.title} by ${newBlog.author} added!`, type: 'success'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)   
    }
    catch (error){
      setMessage({ text: error.response?.data?.error, type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)      
    }
  }

  const handleLogin = async event => {
  event.preventDefault()
  try {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem(
    'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    console.log(`User object:${user}`)
  }
  catch (error) {
    setMessage({text: error.response?.data?.error || 'wrong credential', type: 'error' })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  }

  const LogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
  }
  
  const blogFormRef = useRef()

  const blogForm = () => (
    <Toggable buttonLabel='new Blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Toggable>
  )

  return (
    <div>
      <Message message={message} />
      {!user && <LoginForm
      handleLogin={handleLogin} 
      setUsername={setUsername} username={username} 
      setPassword={setPassword} password={password} 
      />}

      {user && (
        <div>    
          <p>{user.name} logged in</p>
          <button onClick={() => LogOut()}>Log Out</button>
          {blogForm()}
          <BlogList blogs={blogs} user={user}/>
        </div>
      )}
    </div>
  )
}

export default App