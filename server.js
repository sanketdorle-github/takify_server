const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');



const app = express();
app.use(cors({
    origin: '*',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    // credentials: true,  // Enable credentials
}));
dotenv.config();
  
  app.use(express.json());
  connectDB();
// Root route handler
app.get("/", (req, res) => {
    res.send("Hello, world! This is the root route.");
});

app.use('/api/users', userRoutes);
// Below user routes
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
