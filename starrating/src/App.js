import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  // here we are maintaining  state for rating and hiver , 

  const [rating , setRating] = useState(0);
  const [hover , setHover] = useState(0);
  console.log('rating' , rating);
  console.log('hover' , hover);
  console.log('((rating && hover) || hover)' , ((rating && hover) || hover));
  return (
    <div className="App">
      <h1> Star Ratings</h1>
      {/* for the button when i click set the rating to num and when i hover on that i set the hover to that number and when i leave the mouse where the last rating till that get color */}
      {/* we are adding the on and off css classname based on num is less than the rating and hover or hover  */}
      <div>
        {
          [1,2,3,4,5].map((num) => (
            <button
            key={num}
            onClick={() => {setRating(num)}}
            onMouseOver={()=> setHover(num)}
            onMouseLeave={()=> setHover(rating)}
            >
               <span className={
                `star ${num <= ((rating && hover) || hover) ? 'on' : 'off'}`
                }>
                  &#9733;
                </span>
            </button>
          ))
        }
      </div>
    </div>
  );
}

export default App;
