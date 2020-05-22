import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const AnecdocteDisplay = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </div>
  )
}

const Hint = ({text}) => (<h2>{text}</h2>)

const MostVotedAnecdocteDisplay= ({ title, anecdote, votes }) =>{

  if(votes === 0){
    return (<Hint text="Vote for an anecdocte to see the most voted ones"/>)
  }
  else {
    return (<> <AnecdocteDisplay title={title} anecdote={anecdote} votes={votes} /> </>)
    
  }
}
const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)

  ////      with objects, fill object with key made of index for the length of anecdocte array
  // https://dev.to/_bigblind/quick-tip-transform-an-array-into-an-object-using-reduce-2gh6
  // const initVotesObject = anecdotes.reduce((acc, el, index) => {
  //   return {...acc, [index]:0} //access any key and give value
  // }, {}) //initial object
  // const [votes, setVotes] = useState(initVotesObject)
  // const voteAnecdocte = () => {
  //   console.log(selected)
  //   setVotes({...votes, [selected]:votes[selected]+1})
  //   console.log(votes);
  // }

  ////      with array:
  //the fill() method changes all elements in an array to a static value
  //  fill with 0 from position 2 until position 4
  // console.log(array1.fill(0, 2, 4));
  const [votes, setVotes] = useState(Array(anecdotes.length + 1).fill(0))
  // copy array except for that index, could also do const copy = [...votes]; copy[2] += 1; setVotes(copy) ;    
  const voteAnecdocte = () => (setVotes(votes.map((el, index) => index === selected ? el + 1 : el)))

  const randomAnecdocte = () => {
    //  length 6, array from 0 to 5, so take floor for lower value
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  //  Math max take elemnents, need destruring array
  return (
    <div>
      <AnecdocteDisplay title="Anecdocte of the day" anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text="Vote" handleClick={voteAnecdocte} />
      <Button text="Next anecdocte" handleClick={randomAnecdocte} />
      <MostVotedAnecdocteDisplay title="Anecdocte with most votes" anecdote={anecdotes[votes.indexOf(Math.max(...votes))]} votes={Math.max(...votes)} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)