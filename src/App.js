import React, { useState } from "react";
import "./App.css";
import Scene from "./video/scene.mp4";
import Draggable from "react-draggable";

function App() {
  const [pos, setPos] = useState({ x: 0, y: -50 });
  const onStop = (e, data) => {
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;

    if (data.x < halfWidth && data.y < halfHeight) {
      setPos({ x: 0, y: -50 });
    } else if (data.x > halfWidth && data.y < halfHeight) {
      setPos({ x: window.innerWidth - 250, y: -50 });
    } else if (data.x < halfWidth && data.y > halfHeight) {
      setPos({ x: 0, y: window.innerHeight - 200 });
    } else if (data.x > halfWidth && data.y > halfHeight) {
      setPos({ x: window.innerWidth - 250, y: window.innerHeight - 200 });
    }
  };

  return (
    <>
      <div className="App">
        <h1>HOLOFY CHALLENGE</h1>
      </div>
      <Draggable
        handle=".handle"
        defaultPosition={pos}
        position={pos}
        scale={1}
        onStop={onStop}>
        <div>
          <div className="handle">
            <video src={Scene} autoPlay={true}></video>
          </div>
        </div>
      </Draggable>
    </>
  );
}

export default App;
