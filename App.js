const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to your MongoDB database using Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb:27.0.0.1:27017/chatGpt", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});





// Set up middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static('public'));


// Define your task model (you should have a task schema defined in a separate file)
const Task = require('./models/task');

// Define routes (you should have routes in separate files)
const taskController = require('./controllers/taskController');
app.use('/tasks', taskController);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
