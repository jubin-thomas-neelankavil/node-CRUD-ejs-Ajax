const express = require('express');
const router = express.Router();
const Task = require('../models/task'); // Import the Task model

// Route to list all tasks  with promise
router.get('/', (req, res) => {
    Task.find({})
    .exec()
    .then((tasks) => {
      res.render('index', { tasks });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('An error occurred.');
    });
  
});

// Route to render the create task form
router.get('/new', (req, res) => {
  res.render('create');
});

// Route to create a new task with promise
router.post('/', (req, res) => {
  const { title, description, status } = req.body;
  const newTask = new Task({ title, description, status });

  newTask.save()
  .then(() => {
    res.redirect('/tasks');
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('An error occurred.');
  });

});

// Route to render the edit task form with promise
router.get('/:id/edit', (req, res) => {
  const taskId = req.params.id;
  Task.findById(taskId)
  .exec()
  .then((task) => {
    res.render('edit', { task });
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('An error occurred.');
  });

});

// Route to update an existing task with promise
router.put('/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;
  Task.findByIdAndUpdate(taskId, { title, description, status })
  .exec()
  .then(() => {
    res.redirect('/tasks');
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('An error occurred.');
  });

});

// Route to delete a task  without promise
router.delete('/:id', async (req, res) => {
    const taskId = req.params.id;
  
    try {
      await Task.findByIdAndDelete(taskId).exec();
      res.redirect('/tasks');
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred.');
    }
  });
  

module.exports = router;
