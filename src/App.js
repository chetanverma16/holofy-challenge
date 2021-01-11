import React, { useState } from "react";
import "./App.css";
import Scene from "./video/scene.mp4";

function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [style, setStyle] = useState({});
  const [dragging, setDragging] = useState(false);
  const [elem, setElem] = useState(React.createRef());
  const [isPause, setIsPause] = useState(true);

  const handleDragStart = (e) => {
    e.preventDefault();
    setPos({
      x: e.clientX - e.currentTarget.getBoundingClientRect().left,
      y: e.clientY - e.currentTarget.getBoundingClientRect().top,
    });
    setDragging(true);
  };
  const handleDragging = (e) => {
    e.preventDefault();
    if (dragging) {
      var left = e.clientX - pos.x;
      var top = e.clientY - pos.y;

      setStyle({
        left: left,
        top: top,
      });
    }
  };
  const handleDragEnd = (e) => {
    e.preventDefault();
    setDragging(false);
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;

    const currentX = e.clientX;
    const currentY = e.clientY;
    if (currentX < halfWidth && currentY < halfHeight) {
      setStyle({
        left: 0,
        top: 0,
      });
    } else if (currentX > halfWidth && currentY < halfHeight) {
      setStyle({
        left: window.innerWidth - 250,
        top: 0,
      });
    } else if (currentX < halfWidth && currentY > halfHeight) {
      setStyle({
        left: 0,
        top: window.innerHeight - 150,
      });
    } else if (currentX > halfWidth && currentY > halfHeight) {
      setStyle({
        left: window.innerWidth - 250,
        top: window.innerHeight - 150,
      });
    }
  };

  const handleTouchDragStart = (e) => {
    e.preventDefault();
    setPos({
      x: e.touches[0].clientX - e.target.getBoundingClientRect().left,
      y: e.touches[0].clientY - e.target.getBoundingClientRect().top,
    });
    setDragging(true);
  };

  const handleTouchDragging = (e) => {
    e.preventDefault();
    if (dragging) {
      var left = e.touches[0].clientX - pos.x;
      var top = e.touches[0].clientY - pos.y;
      setStyle({
        left: left,
        top: top,
      });
    }
  };

  const handleTouchDragEnd = (e) => {
    console.log(e);
    e.preventDefault();
    setDragging(false);
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;

    const currentX = e.changedTouches[0].clientX;
    const currentY = e.changedTouches[0].clientY;
    if (currentX < halfWidth && currentY < halfHeight) {
      setStyle({
        left: 0,
        top: 0,
      });
    } else if (currentX > halfWidth && currentY < halfHeight) {
      setStyle({
        left: window.innerWidth - 200,
        top: 0,
      });
    } else if (currentX < halfWidth && currentY > halfHeight) {
      setStyle({
        left: 0,
        top: window.innerHeight - 200,
      });
    } else if (currentX > halfWidth && currentY > halfHeight) {
      setStyle({
        left: window.innerWidth - 200,
        top: window.innerHeight - 200,
      });
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
        src={Scene}
        style={style}
        autoPlay={true}
        onClick={clickHandler}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragging}
        onMouseUp={handleDragEnd}></video>

      <img
        style={style}
        onTouchStart={handleTouchDragStart}
        onTouchMove={handleTouchDragging}
        onTouchEnd={handleTouchDragEnd}
        alt="Replacing Video"
        src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=747&q=80"></img>
    </>
  );
}

export default App;
