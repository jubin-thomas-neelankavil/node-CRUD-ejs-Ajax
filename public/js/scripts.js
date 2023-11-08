$(document).ready(function() {
    // Handle the form submission to create a new task
    $('#createTaskForm').submit(function(event) {
      event.preventDefault();
      
      // Serialize form data into JSON
      const formData = $(this).serializeArray();
      const taskData = {};
      
      for (let i = 0; i < formData.length; i++) {
        taskData[formData[i].name] = formData[i].value;
      }
  
      // Send an AJAX POST request to create a new task
      $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskData,
        success: function() {
          window.location.href = '/tasks';
        },
        error: function() {
          console.error('An error occurred while creating a task.');
        }
      });
    });
  
    // Handle the form submission to update an existing task
    $('#editTaskForm').submit(function(event) {
      event.preventDefault();
      
      // Serialize form data into JSON
      const formData = $(this).serializeArray();
      const taskData = {};
      
      for (let i = 0; i < formData.length; i++) {
        taskData[formData[i].name] = formData[i].value;
      }
  
      // Get the task ID from the form action
      const taskId = $(this).attr('action').split('/').pop();
  
      // Send an AJAX PUT request to update the task
      $.ajax({
        type: 'PUT',
        url: '/tasks/' + taskId,
        data: taskData,
        success: function() {
          window.location.href = '/tasks';
        },
        error: function() {
          console.error('An error occurred while updating the task.');
        }
      });
    });
  
    // Handle the delete button click to delete a task
    $('.deleteTask').click(function() {
      const taskId = $(this).data('task-id');
  
      // Send an AJAX DELETE request to delete the task
      $.ajax({
        type: 'DELETE',
        url: '/tasks/' + taskId,
        success: function() {
          window.location.href = '/tasks';
        },
        error: function() {
          console.error('An error occurred while deleting the task.');
        }
      });
    });
  });
  