import { useEffect, useRef, useState } from 'react';
import './App.css';
function App() {
  // instead of writing the input element 4 times we need to write this one
  const emptyArr =['' , '' , '' , ''];
  const [inputs , setInputs] = useState(emptyArr);
  const[missing , setMissing] = useState(emptyArr);
  // we are using the refs to get the input one focus 
  const refs = [useRef() , useRef() , useRef() , useRef()];
  const code = '1234'
  // here i am mapping the inputs and if the item is ' then we return index and then i am filter which the item is exist and item is zero
  // on the console we get the misse or the nothing is exist that index we get.

  const handleSubmit = () => {
    const missed = inputs
      .map((item, i) => {
        if (item === "") {
          return i;
        }
      }).filter((item) => item || item === 0);
      setMissing(missed)
    console.log("missed ", missed);
    if(missed.length){
      return
    }
    const userInput = inputs.join('');
    const isMatch = userInput === code;
    const msg = isMatch ? "code is Valid" : "Code is not valid";
    alert(msg);
  };
  
  // we are using the useeffect to make the first one to be focus when application open
  useEffect(()=>{
    refs[0].current.focus();
  },[])
// we are using this function to move the cursor to next one when we enter the number on the input
const handleInputChange = (e , index)=>{
  const val = e.target.value;
  console.log(val , index);
  if(!Number(val)){
    return;
  }
  // this is the condition to shift the focus from one input to another one
  if(index < inputs.length -1){
    refs[index+1].current.focus();
  }
  // first intially the copyinputs are the empty and then we are adding the val to the each index and we are setinputs.
  const copyInputs = [...inputs];
  copyInputs[index] = val;
  setInputs(copyInputs);
}
// these function to move the backward
const handleonKeepdown =(e , index)=>{
  console.log(e.keyCode , index);
  // here we are finding the keycode for the backspace
  if(e.keyCode === 8){
    // we are copythe inputs and we are making that index to '' and we are set the input
    const copyInputs = [...inputs];
    copyInputs[index] = '';
    setInputs(copyInputs);

    // to move the focus to back
    if(index> 0){
      refs[index-1].current.focus();
    }
  }
}
// these is for to paste the data
const handlePaste = (e) =>{
  // by using the clipboard
  e.preventDefault();
  const data = e.clipboardData.getData('text')
  console.log('paste data' , data);
  if(!Number(data) || data.length !== inputs.length){
    return 
  }
  const pastCode = data.split('');
  setInputs(pastCode);
  refs[inputs.length - 1].current.focus();
}
console.log('inputs' , inputs);
  return (
    <div className="App">
      <h1> Two-Factor code input</h1>
      <div>
        {
          emptyArr.map((item , i) =>{
            return <input 
            value={inputs[i]}
            ref={refs[i]} 
            key={i} 
            type='text' 
            maxLength="1"
            onPaste={(e) => handlePaste(e)}
            onChange={(e)=> handleInputChange(e , i)}
            onKeyDown={(e)=> handleonKeepdown(e , i)}
            className={missing.includes(i) ? 'error' : ''}
            /> 
          })
        }
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
