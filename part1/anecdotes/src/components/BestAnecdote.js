const BestAnecdote = ({anecdotes, best}) => {
    return (
        <div>
            <h2>Anecdote with most votes</h2>
            <p> {anecdotes[best]} </p>
        </div>
    )
}

export default BestAnecdote;