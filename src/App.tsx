import React from "react";
import logo from "./piplup.png";
import "./App.css";
import PokeSearchInput from "./components/pokesearchInput";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PokeSearchInput />
      </header>
    </div>
  );
}

export default App;
