import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  // 未完了のTODOを格納する配列
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") {
      alert("入力してください");
      return;
    }
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    // 未完了TODOから対象のTODOを削除
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    // 未完了TODOから対象のTODOを削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    // 完了TODOに未完了TODOから削除したTODOを追加（配列を結合）する
    const newCompleteTodo = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompleteTodo);
    setIncompleteTodos(newIncompleteTodos);
  };

  const onClickBack = (index) => {
    // 完了TODOから対象のTODOを削除
    const newCompelteTodos = [...completeTodos];
    newCompelteTodos.splice(index, 1);

    // 上記の削除したTODOを未完了TODOの最後に追加
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompelteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるTODOは５個までですよー。消化せいやー。
        </p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
