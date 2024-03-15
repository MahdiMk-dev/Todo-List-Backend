const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const user_id = searchParams.get('id');
console.log(user_id)
if(!user_id){
window.location.href='./login.html'
}
function submitForm() {
    // Get form data
    let imp = document.getElementById('imp').value;
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    const id = searchParams.get('id');

    // Prepare data to be sent in the request body
    var formData = new FormData();
    formData.append('title', title);
    formData.append('imp', imp);
    formData.append('description', description);
    formData.append('id',id)

    // Make a POST request to the PHP script
    fetch('http://localhost/Assignment%202-todo/backend/edit.php', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }) // Parse response as JSON
    .then(data => {
        // Handle the response
        if (data.status === 'success') {
            alert(data.message);
            const user_id = document.getElementById('user_id');
            window.location.href = '../pages/main.html?user_id='+user_id.value;
            // Optionally, redirect to another page or update UI
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.log(error);
        // Handle error
        alert('An error occurred. Please try again later.');
    });
}
// Attach form submission function to submit button click event
document.getElementById('updateTask').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission
    submitForm(); // Call the function to submit the form
});

function getData(){
const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get('id');
fetch('http://localhost/Assignment%202-todo/backend/read_one.php?id='+id)
.then(response => response.json()) // Parse response as JSON
.then(data => {
    // Handle the response
    if (data.length > 0) {
        // Display tasks on the webpage
        const title = document.getElementById('title');
        const description = document.getElementById('description');
        const importance = document.getElementById('imp');
        const user_id = document.getElementById('user_id');
        title.value=data[0].title;
        description.value=data[0].description;
        importance.value=data[0].importance;
        user_id.value=data[0].user_id;
    }
})
.catch(error => {
    console.error('Error:', error);
    // Handle error
    alert('An error occurred. Please try again later.');
});
}
// Run the function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", getData);