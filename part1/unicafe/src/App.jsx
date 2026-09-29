import { useState } from 'react'

const Button = ({ onClick, text }) =>
<button onClick={onClick}>{text}</button>

const StatisticLine = (props) => <div> {props.text} {props.value} </div>

const Statistics = ({good,neutral,bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
    )
  } else {
  const all = good+bad+neutral
  const average = (good*1+bad*(-1))/all
  const positive = good*100/all

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text = 'good' value = {good} />
      <StatisticLine text = 'neutral' value = {neutral} />
      <StatisticLine text = 'bad' value = {bad} />
      <StatisticLine text = 'all' value = {all}/>
      <StatisticLine text = 'average' value = {average}/>
      <StatisticLine text = 'positive' value = {`${positive} %`} />
    </div>
  )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (setter,value) => {
    setter(value)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {() => setToValue(setGood, good+1)} text = 'good' />
      <Button onClick = {() => setToValue(setNeutral, neutral+1)} text = 'neutral' />
      <Button onClick = {() => setToValue(setBad, bad+1)} text = 'bad' />

      <Statistics good = {good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App