

function fetchTasks() {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const user_id = searchParams.get('user_id');
  // Make a GET request to fetch tasks from the server
  fetch('http://localhost/Assignment%202-todo/backend/read.php?user_id='+user_id)
  .then(response => response.json()) // Parse response as JSON
  .then(data => {
      // Handle the response
      if (data.length > 0) {
          // Display tasks on the webpage
          var tasksList = document.getElementById('items-container');
          tasksList.innerHTML = ''; // Clear existing tasks
          data.forEach(task => {
              tasksList.innerHTML +=  `<div class="flex column center item-card " id="div${task.id}">
              <h3>${task.title}</h3>
              <p>${task.description}</p>
              <p>${task.importance}</p>
              <p id="status">${task.status}</p>
              <div class="flex space-between">
                  <button class="primary-button markAsDone" item-id= ${task.id}>Mark as done</button>
                  <button class="secondary-button delete" data-task-id= ${task.id}>delete</button>
              </div>
            </div>`;
          });
          attachDeleteEventListeners();
      } else {
          // No tasks found
          alert('No tasks found');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      // Handle error
      alert('An error occurred. Please try again later.');
  });
}

// Call the fetchTasks function when the page loads
window.onload = fetchTasks;
var navigateButton = document.getElementById('add-button');

// Add click event listener to the button
navigateButton.addEventListener('click', function() {
    // Navigate to another page
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    const user_id = searchParams.get('user_id');
    window.location.href = './add.html?id='+user_id; // Replace 'other_page.html' with the URL of the page you want to navigate to
});
function deleteTask(taskId) {
  // Make a POST request to the delete_task.php endpoint
  fetch('http://localhost/Assignment%202-todo/backend/delete.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'id=' + taskId
  })
  .then(response => response.json()) // Parse response as JSON
  .then(data => {
      // Handle the response
      if (data.status === 'success') {
          alert(data.message);
          // Optionally, reload the task list or update UI
      } else {
          alert(data.message);
      }
  })
  .catch(error => {
      console.error('Error:', error);
      // Handle error
      alert('An error occurred. Please try again later.');
  });
}
function attachDeleteEventListeners() {
delButtons = document.querySelectorAll(".delete");

console.log(delButtons);

delButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        console.log("delete")
        var taskId = this.getAttribute('data-task-id');
        if (taskId) {
            if (confirm("Are you sure you want to delete this task?")) {
                deleteTask(taskId);
            }
        }
        window.location.reload();
    });
});
}
 