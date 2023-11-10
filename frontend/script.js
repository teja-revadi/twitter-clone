document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const message = document.getElementById("message");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Send the login data to the backend for authentication
        fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.refresh) {

                // Store the JWT in localStorage (not secure for production)
                localStorage.setItem("refresh", data.refresh);
                localStorage.setItem("access", data.access);


                message.innerHTML = "Login successful. Redirecting...";
                // Redirect to a secure page
                window.location.href = "secure.html";
            } else {
                message.innerHTML = "Invalid username or password.";
            }
        });
    });
});
