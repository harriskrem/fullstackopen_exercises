import { useState, useEffect } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    if (user.username === blog.user.username) {
      setAuthenticated(true)
    }
  }, [])

  const [visible, setVisible] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  const showWhenVisibleState = { display: visible ? '' : 'none' }
  const showWhenAuthenticated = { display: authenticated ? '' : 'none' }

  const toggleDetailsVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>{blog.title} by {blog.author}
        <button onClick={toggleDetailsVisibility} className='detailsbtn' >{visible ? 'hide details' : 'view details'}</button>
      </div>
      <div style={showWhenVisibleState} className='details' >
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={() => addLike(blog)} className='likebtn' >like</button> </p>
        <p>{blog.user.name}</p>
        <button id='remove-btn' onClick={() => removeBlog(blog)} style={showWhenAuthenticated} >remove</button>
      </div>
    </div>
  )

}



export default Blog