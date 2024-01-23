import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisibleState = { display: visible ? '' : 'none' }
  const toggleDetailsVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>{blog.title} <p>{blog.author}</p>
        <button onClick={toggleDetailsVisibility} className='detailsbtn' >{visible ? 'hide details' : 'view details'}</button>
      </div>
      <div style={showWhenVisibleState} className='details' >
        <p>{blog.url}</p>
        <p>likes{blog.likes} <button onClick={() => addLike(blog)} className='likebtn' >like</button> </p>
        <p>{blog.user.name}</p>
        <button onClick={() => removeBlog(blog)} >remove</button>
      </div>
    </div>
  )

}



export default Blog