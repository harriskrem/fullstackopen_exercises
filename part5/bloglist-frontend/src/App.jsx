import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }
  const addBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then(() => {
        blogFormRef.current.toggleVisibility()
        blogService.getAll().then(blogs => {
          const lastItem = blogs[blogs.length - 1]
          setBlogs(blogs.concat(lastItem))
          setBlogs(blogs)
        })
        setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const addLike = (blog) => {
    blogService
      .update(blog.id, { ...blog, likes: Number(blog.likes) + 1 })
      .then(returnedBlog => {
        const indextoUpdate = blogs.findIndex(element => element.id.toString() === returnedBlog.id.toString())
        let blogsCopy = [...blogs]
        blogsCopy[indextoUpdate].likes = returnedBlog.likes
        // blogsCopy.sort((a, b) => a.likes < b.likes)
        setBlogs(blogsCopy)
      })
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog.id)
        .then(() => {
          blogService.getAll().then(res => setBlogs(res))
        })
    }
  }
  return (
    <div>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      {!user && <LoginForm handleLogin={handleLogin} />}
      {user &&
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout} >logout</button> </p>

          {<Togglable buttonLabel='create new blog' ref={blogFormRef} >
            <h2>create new</h2>
            <BlogForm addBlog={addBlog} />
          </Togglable>}
          {blogs.toSorted((a, b) => ((a.likes ?? 0) < (b.likes ?? 0) ? 1 : -1)).map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />
          )}
        </>
      }
    </div>
  )

}

export default App