import React, { useState, useEffect } from "react";
import "./App.css";
import Scene from "./video/scene.mp4";

function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [holding, setHolding] = useState(false);
  const [elem, setElem] = useState(React.createRef());
  const [isPause, setIsPause] = useState(true);
  // const onStop = (e, data) => {
  //   const halfWidth = window.innerWidth / 2;
  //   const halfHeight = window.innerHeight / 2;

  //   if (data.x < halfWidth && data.y < halfHeight) {
  //     setPos({ x: 0, y: -50 });
  //   } else if (data.x > halfWidth && data.y < halfHeight) {
  //     setPos({ x: window.innerWidth - 250, y: -50 });
  //   } else if (data.x < halfWidth && data.y > halfHeight) {
  //     setPos({ x: 0, y: window.innerHeight - 200 });
  //   } else if (data.x > halfWidth && data.y > halfHeight) {
  //     setPos({ x: window.innerWidth - 250, y: window.innerHeight - 200 });
  //   }
  // };

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", notHoldingElem);
  }, [holding]);

  const notHoldingElem = (e) => {
    e.preventDefault();
    setHolding(false);
  };

  const holdingElem = (e) => {
    e.preventDefault();
    setHolding(true);
  };

  const handleMove = (e) => {
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;
    e.preventDefault();
    if (holding) {
      setPos({ x: e.clientX, y: e.clientY });
      elem.current.pause();
      setIsPause(true);
    } else {
      const currentX = e.clientX;
      const currentY = e.clientY;
      if (currentX < halfWidth && currentY < halfHeight) {
        setPos({ x: 0, y: 0 });
      } else if (currentX > halfWidth && currentY < halfHeight) {
        setPos({ x: window.innerWidth - 250, y: 0 });
      } else if (currentX < halfWidth && currentY > halfHeight) {
        setPos({ x: 0, y: window.innerHeight - 150 });
      } else if (currentX > halfWidth && currentY > halfHeight) {
        setPos({ x: window.innerWidth - 250, y: window.innerHeight - 150 });
      }
      elem.current.play();
      setIsPause(false);
    }
  };

  const clickHandler = () => {
    if (isPause) {
      elem.current.play();
      setIsPause(!isPause);
    } else {
      elem.current.pause();
      setIsPause(!isPause);
    }
  };

  return (
    <>
      <div className="App">
        <h1>HOLOFY CHALLENGE</h1>
      </div>
      <video
        ref={elem}
        style={{ top: pos.y, left: pos.x }}
        src={Scene}
        autoPlay={true}
        onMouseDown={holdingElem}
        onClick={clickHandler}
        onMouseUp={notHoldingElem}></video>
    </>
  );
}

export default App;
