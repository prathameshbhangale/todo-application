import Todo from "../models/Todo.js";
import mongoose from "mongoose";

export const addTodo = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required' });
    }
    const userid = req.user.userID
    const todo = await Todo.create({
      user: userid,
      text,
    });

    res.status(201).json({ success: true, todo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding todo', error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
    try {
      const { id } = req.query;
  
      const todo = await Todo.findById(id);
  
      if (!todo) {
        return res.status(404).json({ success: false, message: 'Todo not found' });
      }
  
      if (todo.user.toString() !== req.user.userID) {
        return res.status(403).json({ success: false, message: 'Not authorized to delete this todo' });
      }
  
      await todo.deleteOne();
  
      res.status(200).json({ success: true, message: 'Todo deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error deleting todo', error: error.message });
    }
  };

export const listTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.userID }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, todos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching todos', error: error.message });
  }
};
