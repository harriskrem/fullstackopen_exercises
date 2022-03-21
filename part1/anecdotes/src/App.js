import { useState } from 'react'
import Anecdotes from './components/Anecdotes';
import BestAnecdote from './components/BestAnecdote';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0);   // selected anecdote
  const [votes, setVotes] = useState({
    arrVotes: Array(anecdotes.length).fill(0)
  })
  const [mostVoted, setMostVoted] = useState(0); // it's an index

  const handleNext = () => {
    let rnd = Math.floor(Math.random() * anecdotes.length);
    setSelected(rnd);
  }
  console.log(votes.arrVotes)
  const handleVote = () => {
    
    let copy = [...votes.arrVotes];
    copy[selected] += 1;
    setVotes({arrVotes: copy});

    
    let mostPointsIndex = copy.findIndex((element) => element === Math.max.apply(Math,copy));
    
    setMostVoted(mostPointsIndex);

  }

  return (
    <div>
      <Anecdotes selected={selected} anecdotes={anecdotes} votes={votes} handleVote={handleVote} handleNext={handleNext}/>
      <BestAnecdote anecdotes={anecdotes} best={mostVoted}/>
    </div>
    
  )
}

export default App