import "./App.css";
import React from "react";
import Question from "./components/questions/questions";
import Alerts from "./components/alerts/alerts";

function App() {
  return (
    <>
      <Alerts />
      <Question />
    </>
  );
}

export default App;
