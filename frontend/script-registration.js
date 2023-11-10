document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const message = document.getElementById("message");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const first_name = document.getElementById("first-name").value;
        const last_name = document.getElementById("last-name").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Send the login data to the backend for authentication
        fetch("http://127.0.0.1:8000/api/users/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ first_name,last_name,username, password })
        })
        .then(data => {
            if (data.ok) {
                message.innerHTML = "Registered successfully. Redirecting...";
                window.location.href = "index.html";
            } else {
                message.innerHTML = "username already taken";
            }
        });
    });
});
