import React from "react";
import ReactDOM from "react-dom";
import QuestionList from "./QuestionList";

function App() {
  return <QuestionList />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
