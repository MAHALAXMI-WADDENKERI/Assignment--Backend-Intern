const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const assignmentRoutes = require('./routes/assignment');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/assignment-portal', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/api/users', userRoutes);
app.use('/api', assignmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
