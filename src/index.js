import React from "react";
import ReactDOM from "react-dom";
import TodoApp from "./TodoApp";

const App = () => (
  <div>
    Todo List App (Advanced Hooks)
    <br />
    <TodoApp />
  </div>
);
ReactDOM.render(<App />, document.getElementById("root"));
