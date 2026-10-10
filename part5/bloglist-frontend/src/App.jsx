import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleBlog = async event => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      setMessage({text: `a new blog ${title} by ${author} added!`, type: 'success'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)   
      setUrl('')
      setAuthor('')
      setTitle('')
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
          <BlogForm 
          title={title} setTitle={setTitle} 
          author={author} setAuthor={setAuthor}
          url={url} setUrl={setUrl} 
          handleBlog={handleBlog}
          />
          <BlogList blogs={blogs} user={user}/>
        </div>
      )}
    </div>
  )
}

export default App