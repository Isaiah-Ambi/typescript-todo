import { Schema, model } from 'mongoose';
import { Todo } from '../todo';

const todoSchema = new Schema<Todo>({
  name: { type: String, required: true },
  done: { type: Boolean, default: false },
});

export default model<Todo>('Todo', todoSchema);
