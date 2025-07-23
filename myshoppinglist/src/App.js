import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [food, setFood] = useState("");
  const [shoppinglist, setShoppingList] = useState([]);
  const [bucketList, setBucketList] = useState([]);
  const handleInput = (e) => {
    console.log(e.target.value);
    setFood(e.target.value);
  };
  const fetchItems = async (food) => {
    const url = `https://api.frontendeval.com/fake/food/${food}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setShoppingList(data);
  };
  console.log("shopping list ", shoppinglist);
  useEffect(() => {
    if (food.length >= 2) {
      // make an api call
      fetchItems(food);
    }
  }, [food]);

  const handleShoppingList = (e) => {
    console.log(e.target.getAttribute("data-id"));
    const idx = e.target.getAttribute("data-id");
    if (idx) {
      const obj = {
        id: Date.now(),
        data: shoppinglist[idx],
        isDone: false,
      };
      const copyBucketList = [...bucketList];
      copyBucketList.push(obj);
      setBucketList(copyBucketList);
      setFood("");
    }
  };
  console.log("bucket list  ", bucketList);

  const handleDelete = (id) => {
    const copyBucketList = [...bucketList];
    const newList = copyBucketList.filter((item) => item.id !== id);
    setBucketList(newList);
  };

  const handleRightClick = (id) => {
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setBucketList(newBucketList);
  };
  return (
    <div className="App">
      <h1>My Shopping List</h1>
      <div>
        <input value={food} onChange={handleInput} />
      </div>

      {/* auto suggestion */}
      {food.length >= 2 ? (
        <div className="shopping-list" onClick={handleShoppingList}>
          {shoppinglist.map((item, index) => {
            return (
              <div data-id={index} className="product">
                {item}
              </div>
            );
          })}
        </div>
      ) : null}
      {/* Bucket List  */}
      <div className="bucket">
        {bucketList.map((item) => {
          return (
            <div className="shopping-item">
              <button onClick={() => handleRightClick(item.id)}>✓</button>
              <div className={item.isDone ? "strik" : ""}>{item?.data}</div>
              <button onClick={() => handleDelete(item.id)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
