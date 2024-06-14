import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './db'; // Import MongoDB connection function
import todoRoutes from './routes/todos'; // Import routes for todos

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for API access
app.use(bodyParser.json()); // Parse JSON request bodies

// Routes
app.use('/api/todos', todoRoutes); // Mount routes for todos under '/api/todos'

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
