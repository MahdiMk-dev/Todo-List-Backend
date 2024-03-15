
function submitForm() {
    // Get form data
    let imp = document.getElementById('imp').value;
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    const user_id = searchParams.get('id');

    // Prepare data to be sent in the request body
    var formData = new FormData();
    formData.append('title', title);
    formData.append('imp', imp);
    formData.append('description', description);
    formData.append('user_id',user_id)

    // Make a POST request to the PHP script
    fetch('http://localhost/Assignment%202-todo/backend/create.php', {
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
            window.location.href = '../pages/main.html?user_id='+user_id;
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
// Get the anchor element
var myLink = document.getElementById('user');
const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const user_id = searchParams.get('id');
// Set the href attribute dynamically
myLink.setAttribute('href', './main.html?user_id='+user_id);
// Attach form submission function to submit button click event
document.getElementById('addTask').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission
    submitForm(); // Call the function to submit the form
});

