document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.querySelector('.form-container.sign-in form');
    const adminCheckbox = document.getElementById('adminCheckbox');

    signInForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const enteredUsername = document.querySelector('.form-container.sign-in input[type="text"]').value;
        const enteredPassword = document.querySelector('.form-container.sign-in input[type="password"]').value;

        const isAdminLogin = adminCheckbox.checked;

        if (isAdminLogin) {
            const adminCredentials = { username: 'admin', password: 'admin123' };

            if (enteredUsername === adminCredentials.username && enteredPassword === adminCredentials.password) {
                alert('Admin Login successful!');
                window.location.href = "../pages/admin.html";
            } else {
                alert('Invalid admin credentials. Please try again.');
            }
        } else {
            // Regular user login
function loadUsers() {
  const storedUsers = localStorage.getItem('user');
  if (storedUsers) {
    users = JSON.parse(storedUsers);

    console.log(users)
  }
}

loadUsers();
user=users.find(user => user.username === enteredUsername)

            if (users && enteredUsername === user.username && enteredPassword === user.password) {
                alert('Login successful!');
                window.location.href = "../pages/main.html";
            } else {
                alert('Invalid username or password. Please try again.');
            }
        }
    });
});
