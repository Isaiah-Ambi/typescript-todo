import express from 'express';
import { Todo } from '../todo'; // Import Todo interface
import TodoModel from '../models/todo'; // Import Mongoose model


const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await TodoModel.find(); // Fetch all todos from database
    res.json(todos); // Send todos as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Server Error' }); // Handle errors
  }
});

// Create a todo
router.post('/', async (req, res) => {
  const { name } = req.body; // Destructure name from request body
  if (!name) { // Check if name is provided
    return res.status(400).json({ message: 'Please provide a name for the todo.' });
  }
  try {
    const newTodo = new TodoModel({ name }); // Create a new Todo object
    const savedTodo = await newTodo.save(); // Save the todo to the database
    res.status(201).json(savedTodo); // Send the created todo with status code 201 (Created)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' }); // Handle errors
  }
});

// Get a single todo by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await TodoModel.findById(id); // Find todo by ID
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo); // Send the found todo
  } catch (error) {
    res.status(500).json({ message: 'Server Error' }); // Handle errors
  }
});

// Delete a todo by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id); // Find and delete todo
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' }); // Send success message
  } catch (error) {
    res.status(500).json({ message: 'Server Error' }); // Handle errors
  }
});

// Update a todo (mark as done/undone)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  if (done === undefined) {
    return res.status(400).json({ message: 'Please provide a "done" property.' });
  }
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(id, { done }, { new: true }); // Find and update todo
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updatedTodo); // Send the updated todo
  } catch (error) {
    res.status(500).json({ message: 'Server Error' }); // Handle errors
  }
});

export default router;
