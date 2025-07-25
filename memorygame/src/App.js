import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

// [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
// 4x4 we use till 8        16/2 = 8
// 6x6 we use the till 18   36/2 = 18
// this function t get the values from 1 to 8 twice
const getNums = () => {
  const list = [];
  for (let i = 1; i <= 8; i++) {
    list.push(i);
    list.push(i)
  }
  return list;
};

function App() {
  const [nums , setNums] = useState(getNums())
  const[opened , setOpened] = useState([])
  const [solvedList , setSolvedList] = useState([])
  const [stage, setStage] = useState("init");
// these function to generate the random numbers
  const randomNum = ()=>{
    const copyNums = [...nums];
    return copyNums.sort(()=> Math.random() - 0.5)
  }
  //after clicking the startbutton then we set get the nums in sort
  const handleStart = () => {
    setStage("start");
    setNums(randomNum);
    setSolvedList([]);
     setOpened([]);
  };
  // console.log(" nums  ", nums);
  const handleClick = (num ,index) => {
    if (opened.length === 2) {
      return;
    }
    setOpened((prev) => [...prev , index])
  }
  console.log('opened' , opened)
  console.log('setsolved list' , solvedList);
  useEffect(()=>{
    if(opened.length === 2){
      // numbers equal 
      setTimeout(() => {
        const id1 = opened[0];
        const id2 = opened[1];
        if(nums[id1] === nums[id2]){
          // if equal then we are removing the card
          setSolvedList((prev) => [...prev , nums[id1]]); 
        }
       // if the card is not equal then we need to hide
       setOpened([]);
      }, 1000);
      // numbers nott equal 
    }
  },[opened])
  
  useEffect(()=>{
    if(solvedList.length === 8){
      setStage('win')
    }
  })

  // this is to set  the css classname based on the condition

  const getClassName = (num , index) =>{
    if(solvedList.includes(num)){
      return 'remove'
    }
    else if(opened.includes(index)){
      return 'show'
    }
    else{
      return 'hide'
    }
  }

  return (
    <div className="App">
      <h1> Memory Game</h1>
      {stage === "init" && <button onClick={handleStart}>Play Game</button>}
      {stage === "start" && (
        <div className="game">
          <div className="cards">
            {nums.map((num, i) => (
              <div
                key={i}
                className={`card ${getClassName(num, i)}`}
                onClick={() => handleClick(num, i)}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      )}

      {stage === "win" && (
        <div>
          <h1>You Won the Game!</h1>
          <button onClick={handleStart}> Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
