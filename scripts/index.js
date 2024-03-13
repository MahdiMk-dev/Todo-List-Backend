document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('sign-up');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const storedUsers = localStorage.getItem('user');
        if (storedUsers) {
         
          users = JSON.parse(storedUsers);
            if (!Array.isArray(users))//to avoid dealing with users as an object when it contains one item only, force array form
            users=[users]
        }
        else users=[];
        const existingUser = users.find(user => user.username === username);
  
          if (existingUser) {
            alert('Username already exists. Please choose a different one.');
            return;
          }
        const user = {
            id: users.length + 1,
            username: username,
            email: email,
            password: password
        };


        users.push(user);

        localStorage.setItem('user', JSON.stringify(users));

        alert('Signup successful!');


        window.location.href = "./pages/main.html";


    });
});
