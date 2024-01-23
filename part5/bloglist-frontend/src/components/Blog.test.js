import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('tests', () => {

  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'something.com',
    likes: 5,
    user: { name: 'harris' }
  }

  test('5.13 - display title and author and hide url, likes', () => {
    const container = render(<Blog blog={blog} />).container

    const title = screen.getByText(blog.title)
    expect(title).toBeDefined()

    const author = screen.getByText(blog.author)
    expect(author).toBeDefined()

    const details = container.querySelector('.details')
    expect(details).toHaveStyle('display: none')

  })

  test('5.14 - button controlling the details', async () => {

    const container = render(<Blog blog={blog} />).container

    // before clicking the details is hidden
    const hiddenDetails = container.querySelector('.details')
    expect(hiddenDetails).toHaveStyle('display: none')

    const user = userEvent.setup()
    const button = screen.getByText('view details')
    await user.click(button)

    // after clicking the details is shown
    const shownDetails = container.querySelector('.details')
    expect(shownDetails).not.toHaveStyle('display: none')
  })

  test('5.15 - clicking the like button twice', async () => {

    const addLike = jest.fn()
    const container = render(<Blog blog={blog} addLike={addLike} />).container

    const user = userEvent.setup()
    const button = container.querySelector('.likebtn')
    await user.click(button)
    await user.click(button)

    expect(addLike.mock.calls).toHaveLength(2)
  })

  test('5.16 - blog form', async () => {
    const addBlog = jest.fn()
    const container = render(<BlogForm addBlog={addBlog} />).container

    const user = userEvent.setup()
    const submit = container.querySelector('.submitbtn')


    const title = screen.getByPlaceholderText('write title here')
    const author = screen.getByPlaceholderText('write author here')
    const url = screen.getByPlaceholderText('write url here')

    await user.type(title, 'title example')
    await user.type(author, 'author example')
    await user.type(url, 'url example')
    await user.click(submit)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('title example')
    expect(addBlog.mock.calls[0][0].author).toBe('author example')
    expect(addBlog.mock.calls[0][0].url).toBe('url example')

  })
})

