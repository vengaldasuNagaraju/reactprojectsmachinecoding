import { useState } from 'react';
import './App.css';
function App() {

  const arr = ['1' , '2' , '3' , '4' , '5' , '6' , '7', '8' , '9' , '0' , '+' , '-' , '/' ,'*' , '=' , 'c' , '.']
  
  const [value , setValue] = useState('');
  
  const handleChange = (e) =>{
    console.log(e.target.value);
    setValue(e.target.value);
  }

  const handleClick =(e)=>{
    const id = e.target.id;
    if(id === 'c'){
      setValue('')
    }
    else if( id === '='){
      // we need to show the result
      handleSubmit()
    }
    else{
      setValue((val) => val + id);
    }
    console.log(e.target.id);
  }
const handleSubmit = (e) =>{
    if(e){
      e.preventDefault();
    }
  try{

    // here the eval is the function to caluculate the expression
    // the input field type is text and value state is always stored in string
     // The eval() function in JavaScript always takes a string as input, but it can return either a string, number, boolean, or any other valid JavaScript value depending on the evaluated expression. 

    const ans = eval(value);
    setValue(ans.toString())

  }
  catch(error){
    alert('Invalid inputs')
    console.log(error);
  }
}
  return (
    <div className="App">
      <h1>Calculator</h1>
      <form
      onSubmit={handleSubmit}
      >
        <input 
        type='text'
        value={value} 
        onChange={handleChange}
        />
      </form>
      <div className='container'
      onClick={handleClick}
      >
        {
          arr.map((item , idx) => (
            <button 
            id={item}
            key={idx}
            className='cell'
            >{item}</button>
          ))
        }
      </div>
    </div>
  );
}

export default App;
