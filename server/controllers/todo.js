import Todo from "../models/Todo.js";
import mongoose from "mongoose";

export const addTodo = async (req, res) => {
  try {
    const { userId } = req.user;
    const { text, completed = false } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required' });
    }

    const newTodo = new Todo({
      user: userId,
      text,
      completed,
    });

    await newTodo.save();

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      todo: newTodo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding todo', error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { userId } = req.user;
    const { todoId } = req.query;

    const todo = await Todo.findOne({ _id: todoId, user: userId });

    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    await todo.deleteOne();

    res.status(200).json({ success: true, message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting todo', error: error.message });
  }
};


  export const listTodos = async (req, res) => {
    try {
      const { userId } = req.user;
      const todos = await Todo.find({ user: userId }).sort({ createdAt: -1 });
  
      res.status(200).json({ success: true, todos });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching todos', error: error.message });
    }
  };
  
  export const updateTodo = async (req, res) => {
    try {
      const { userId } = req.user;
      const { todoId } = req.query;
      const { text, completed } = req.body;
  
      const todo = await Todo.findOne({ _id: todoId, user: userId });
  
      if (!todo) {
        return res.status(404).json({ success: false, message: 'Todo not found' });
      }
  
      if (text) todo.text = text;
      if (completed !== undefined) todo.completed = completed;
  
      todo.updatedAt = Date.now();
      
      await todo.save();
  
      res.status(200).json({
        success: true,
        message: 'Todo updated successfully',
        todo,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error updating todo', error: error.message });
    }
  };
  