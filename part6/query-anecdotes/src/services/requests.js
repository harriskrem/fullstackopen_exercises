import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export const createAnecdote = async (anecdote) => {
  const request = await axios.post(baseUrl, anecdote)
  return request.data
}

export const updateAnecdote = async (anecdote) => {
  const request = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return request.data
}