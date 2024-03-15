

function fetchTasks() {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const user_id = searchParams.get('user_id');
  console.log(user_id)
  if(!user_id){
  window.location.href='./login.html'
  return;}
  // Make a GET request to fetch tasks from the server
  fetch('http://localhost/Assignment%202-todo/backend/read.php?user_id='+user_id)
  .then(response => response.json()) // Parse response as JSON
  .then(data => {
    let scoretotal=0;
      // Handle the response
      if (data.length > 0) {
          // Display tasks on the webpage
          var tasksList = document.getElementById('items-container');
          let score=document.getElementById("score");
          score.innerHTML='';
          tasksList.innerHTML = ''; // Clear existing tasks
          data.forEach(task => {
            if(task.importance=="high" && task.status=="completed")
            scoretotal+=3;
            else if(task.importance=="medium" && task.status=="completed")
            scoretotal+=2;
            else if(task.status=="completed")
            scoretotal+=1;
            if(task.status!=="completed")
              tasksList.innerHTML +=  `<div class="flex column center item-card " id="div${task.id}">
              <h3>${task.title}</h3>
              <p>${task.description}</p>
              <p>${task.importance}</p>
              <p id="status">${task.status}</p>
              <div class="flex space-between">
                  <button class="primary-button markAsDone" data-task-id= ${task.id}>Mark as done</button>
                  <button class="secondary-button delete" data-task-id= ${task.id}>delete</button>
                  <button class="secondary-button update" data-task-id= ${task.id}>Update</button>
              
                  </div>
            </div>`;
            else
            tasksList.innerHTML +=  `<div class="flex column center item-card done-item-card " id="div${task.id}">
              <h3>${task.title}</h3>
              <p>${task.description}</p>
              <p>${task.importance}</p>
              <p id="status">${task.status}</p>
              <div class="flex space-between">
                  <button class="secondary-button delete" data-task-id= ${task.id}>delete</button>
              
                  </div>
            </div>`;
          });
          console.log(scoretotal)
          score.innerHTML="Score: "+scoretotal
          attachDeleteEventListeners();
          attacDoneeEventListeners();
          attachUpdateEventListeners();
      } else {
          // No tasks found
          alert('No tasks found');
      }
  })

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
          alert(data.status);
          // Optionally, reload the task list or update UI
      } else {
          alert(data.status);
      }
  })

}
function attacDoneeEventListeners() {
doneButtons = document.querySelectorAll(".markAsDone");

console.log(doneButtons);

doneButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        console.log("done")
        var taskId = this.getAttribute('data-task-id');
        if (taskId) {
            if (confirm("Are you sure you want to complete this task?")) {
                MarkAsDone(taskId);
            }
        }
        window.location.reload();
    });
});



}
function MarkAsDone(taskId) {
    // Make a POST request to the delete_task.php endpoint
    console.log(taskId)
    fetch('http://localhost/Assignment%202-todo/backend/done.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'id=' + taskId
    })
    .then(response =>{ return response.json()}) // Parse response as JSON
    .then(data => {
        console.log(data)
        // Handle the response
        if (data.status === 'success') {
            alert(data.status);
            // Optionally, reload the task list or update UI
        } else {
            alert(data.status);
        }
    })

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
            alert(data.status);
            // Optionally, reload the task list or update UI
        } else {
            alert(data.status);
        }
    })

  }
  function attacDoneeEventListeners() {
  doneButtons = document.querySelectorAll(".markAsDone");
  
  console.log(doneButtons);
  
  doneButtons.forEach(button => {
      button.addEventListener('click', function(event) {
          console.log("done")
          var taskId = this.getAttribute('data-task-id');
          if (taskId) {
              if (confirm("Are you sure you want to complete this task?")) {
                  MarkAsDone(taskId);
              }
          }
          window.location.reload();
      });
  });
  
  
  
  }
  function UpdateTask(taskId) {
      // Make a POST request to the delete_task.php endpoint
      window.location.href='./update.html?id='+taskId;
    }
    function attachUpdateEventListeners() {
    updateButtons = document.querySelectorAll(".update");
    
    console.log(updateButtons);
    
    updateButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            console.log("update")
            var taskId = this.getAttribute('data-task-id');
            if (taskId) {
                  UpdateTask(taskId);
                
            }
        
        });
    });
    }
     