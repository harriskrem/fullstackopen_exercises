import { useState } from 'react'

const BlogForm = ({ addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    addBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>title:<input value={title} onChange={({ target }) => setTitle(target.value)} placeholder='write title here' /></div>
      <div>author:<input value={author} onChange={({ target }) => setAuthor(target.value)} placeholder='write author here'/></div>
      <div>url:<input value={url} onChange={({ target }) => setUrl(target.value)} placeholder='write url here'/></div>
      <button type="submit" className='submitbtn'>create</button>
    </form>
  )
}

export default BlogForm