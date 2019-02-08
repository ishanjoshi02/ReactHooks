import React, { useReducer, useContext, useEffect, useRef } from "react";

const appReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      return [
        ...state,
        {
          id: Date.now(),
          text: "Lorem Ipsum",
          completed: false
        }
      ];
    }
    case "delete": {
      return state.filter(item => item.id !== action.payload);
    }
    case "completed": {
      return state.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            completed: !item.payload
          };
        }
        return item;
      });
    }
    case "reset": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
const Context = React.createContext();
const useEffectOnce = cb => {
  const didRun = useRef(false);
  useEffect(() => {
    if (!didRun.current) {
      cb();
      didRun.current = true;
    }
  });
};
const TodoItem = ({ item }) => {
  const dispatch = useContext(Context);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      }}
    >
      <input
        type="checkbox"
        check={item.completed}
        onChange={() => dispatch({ type: "completed", payload: item.id })}
      />
      <input type="text" value={item.text} />
      <button onClick={() => dispatch({ type: "delete", payload: item.id })}>
        Delete
      </button>
    </div>
  );
};
const TodoList = ({ items }) => (
  <div>
    {items.map(item => (
      <TodoItem key={item.id} item={item} />
    ))}
  </div>
);
const TodoApp = () => {
  const [state, dispatch] = useReducer(appReducer, []);
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state));
  }, [state]);
  useEffectOnce(() => {
    const rawData = localStorage.getItem("data");
    dispatch({ type: "reset", payload: JSON.parse(rawData) });
  });
  return (
    <Context.Provider value={dispatch}>
      <div>
        <TodoList items={state} />
        <button
          onClick={() =>
            dispatch({
              type: "add"
            })
          }
        >
          New Todo
        </button>
      </div>
    </Context.Provider>
  );
};

export default TodoApp;
