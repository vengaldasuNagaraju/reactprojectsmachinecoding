import { useState } from "react";
import "./App.css";
function App() {
  const [value , setValue] = useState(0);
  const [redoList , setRedolist] = useState([])
  const [history , setHistory] = useState([])
  const [undoCount , setUndoCount] = useState(0)

  const maintainHistory = (key , prev , curr) =>{
    // console.log(key, prev, curr);
    const obj = {
      action: key,
      prev,
      curr,
    };
    // here we are using unshift to move the latest to the top.
    // ...history creates a new array with all elements from history 
    const copyHistory = [...history];
    copyHistory.unshift(obj);
    setHistory(copyHistory);
  }
  const handleClick = (key) => {
    const val = parseInt(key);
    maintainHistory(key , value , val+value);
    setValue((existingValue) => existingValue + val)
  };

  const handleUndo =()=>{
    // stack lifo
    if(history.length){
      if(undoCount + 1 > 5){
        alert('You can undo beyond limit = 5');
        return
      }
      setUndoCount((c) => c + 1)
    const copyhist = [...history];
    const firstItem= copyhist.shift();
    console.log("copy hist ", copyhist);
    setHistory(copyhist);

    setValue(firstItem.prev)
    // console.log(firstItem.prev);

    const copyRedoList = [...redoList];
    copyRedoList.push(firstItem)
    setRedolist(copyRedoList)
  }
  }
  console.log( 'redo list' , redoList);

  const handleRedo = () =>{
    if(redoList.length)
    {
      const copyRedoList = [...redoList];
      const popedValue = copyRedoList.pop();
      const { action , prev , curr } = popedValue;
      setValue(curr);
      maintainHistory(action ,prev ,curr);
      setRedolist(copyRedoList);
  }
}
  return (
    <div className="App">
      <h1>Undoable Counter </h1>
      <div className="action-btn">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>
      <div className="user-actions">
        {[-100, -10, -1].map((btn) => {
          return <button onClick={() => handleClick(btn)}>{btn}</button>;
        })}
        <div style={{ fontSize: 40 }}>{value}</div>
        {["+1", "+10", "+100"].map((btn) => {
          return <button onClick={() => handleClick(btn)}>{btn}</button>;
        })}
      </div>
      <div className="history">
        {history.length > 0 ? (
          history.map((item) => {
            return (
              <div className="row">
                <div> {item.action} </div>
                <div>{`[${item.prev} -> ${item.curr}]`}</div>
              </div>
            );
          })
        ) : (
          <div>no history is exist</div>
        )}
      </div>
    </div>
  );
}

export default App;
