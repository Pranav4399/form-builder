import React from "react";
import ReactDOM from "react-dom";
import Builder from "./Builder";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import "./styles.scss";

function App() {
  return (
    <div className="App">
      <DndProvider backend={Backend}>
        <Builder />
      </DndProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
