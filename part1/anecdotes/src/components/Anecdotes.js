const Anecdotes = ({selected, anecdotes, votes, handleVote, handleNext}) => {
    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p>{anecdotes[selected]}</p>
            <p>has {votes.arrVotes[selected]} votes </p>
            <div>
                <button onClick={handleVote} >vote</button>
                <button onClick={handleNext} >next anecdote</button>
            </div>
        </div>
    )
}

export default Anecdotes;