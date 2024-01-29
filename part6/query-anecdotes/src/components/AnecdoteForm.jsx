import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from '../services/requests'
import { useNotificationDispatch } from '../contexts/NotificationContext'


const AnecdoteForm = () => {

  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      notificationDispatch({ type: 'ENABLE', message: `anecdote ${newAnecdote.content} added` })
      setTimeout(() => {
        notificationDispatch({ type: 'DISABLE', message: '' })
      }, 5000)
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueriesData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: () => {
      notificationDispatch({ type: 'ENABLE', message: `too short anecdote, must have length 5 or more` })
      setTimeout(() => {
        notificationDispatch({ type: 'DISABLE', message: '' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content, id: (100000 * Math.random()).toFixed(0), votes: 0 })
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
