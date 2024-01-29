import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content,
    id: (100000 * Math.random()).toFixed(0),
    votes: 0
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (object) => {
  const response = await axios.put(`${baseUrl}/${object.id}`, object)
  return response.data; 
}

export default { getAll, getById, createNew, voteAnecdote }