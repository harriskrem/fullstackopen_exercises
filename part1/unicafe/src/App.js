import { useState } from 'react'
import Header from './components/Header'
import StatisticsLine from './components/StatisticsLine'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each StatisticsLine to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandler = () => setGood(good + 1);
  const neutralHandler = () => setNeutral(neutral + 1);
  const badHandler = () => setBad(bad + 1);

  return (
    <div>
      <Header title={"give feedback"} />
      <StatisticsLine onClick={goodHandler} text={"good"}  />
      <StatisticsLine onClick={neutralHandler} text={"neutral"} />
      <StatisticsLine onClick={badHandler} text={"bad"} />
      <Header title={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;