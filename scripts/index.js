// Assuming this JavaScript code is in a separate file, let's say signup.js

// Function to handle form submission
function submitForm() {
    // Get form data
    var name = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Prepare data to be sent in the request body
    var formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    // Make a POST request to the PHP script
    fetch('http://localhost/Assignment%202-todo/backend/index.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Parse response as JSON
    .then(data => {
        console.log(data)
        // Handle the response
        if (data.status === 'success') {
            alert(data.message);
            // Redirect to another page if needed
            window.location.href = './pages/main.html?user_id='+data.user_id;
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

// Attach form submission function to submit button click event
document.getElementById('signupBtn').addEventListener('click', function(event) {
    console.log("clicked")
    event.preventDefault(); // Prevent default form submission
    submitForm(); // Call the function to submit the form
});

