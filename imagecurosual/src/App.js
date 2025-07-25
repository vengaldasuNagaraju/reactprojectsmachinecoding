import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchImages = async () => {
    setLoading(true);
    const url = "https://www.reddit.com/r/aww/top/.json?t=all";
    const res = await fetch(url, {
      headers: {
        "User-Agent": "MyRedditApp/0.1", // Reddit requires a User-Agent header
      },
    });
    const result = await res.json();
    console.log("end result ", result);
    const data = result.data.children;
    console.log(data);
    const list = data
      .filter((item) => item.data.url_overridden_by_dest.includes(".jpg"))
      .map((item) => item.data.url_overridden_by_dest);
    setImages(list);
    setLoading(false);
  };
  useEffect(() => {
    fetchImages();
  }, []);
  const handleclick = (dir) => {
    console.log("index ", index);
    const lastidx = images.length - 1;
    if (dir === "left") {
      if (index === 0) {
        console.log("lastindex", lastidx);
        setIndex(lastidx);
      } else {
        setIndex((idx) => idx - 1);
      }
    } else if (dir === "right") {
      if (index === lastidx) {
        setIndex(0);
      } else {
        setIndex((idx) => idx + 1);
      }
    }
  };
  //we are moving the images for 1sec
  useEffect(() => {
    const tid = setInterval(() => {
      handleclick("right");
    }, 1000);

    return () => {
      clearInterval(tid);
    };
  }, [index]);
  return (
    <div className="App">
      {loading ? (
        <div>loading ...</div>
      ) : (
        <>
          <button onClick={() => handleclick("left")}>{"<"}</button>
          <img src={images[index]} alt="not-found" />
          <button
            onClick={() => {
              handleclick("right");
            }}
            className="right"
          >
            {">"}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
