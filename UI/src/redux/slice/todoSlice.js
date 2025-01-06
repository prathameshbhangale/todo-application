import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Add a new todo
    addTodo: (state, action) => {
      const newTodo = {
        text: action.payload.text,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completed: false,
      };
      state.todos.push(newTodo);
    },

    // Update the text of an existing todo
    updateTodo: (state, action) => {
      const { index, text } = action.payload;
      const todo = state.todos[index];
      if (todo) {
        todo.text = text;
        todo.updatedAt = new Date().toISOString();
      }
    },

    // Toggle the completed status of a todo
    toggleTodoCompletion: (state, action) => {
      const todo = state.todos[action.payload];
      if (todo) {
        todo.completed = !todo.completed;
        todo.updatedAt = new Date().toISOString();
      }
    },

    // Delete a todo by index
    deleteTodo: (state, action) => {
      state.todos.splice(action.payload, 1);
    },

    // Set the list of todos (could be used for initial data load)
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, updateTodo, toggleTodoCompletion, deleteTodo, setTodos } = todoSlice.actions;

export default todoSlice.reducer;
