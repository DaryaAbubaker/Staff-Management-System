// login.js
const validUsername = "admin";
const validPassword = "password123";

// Handle login on form submission
function handleLogin(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validate login credentials
    if (username === validUsername && password === validPassword) {
        // Store logged-in state (you can use sessionStorage or localStorage for persistence)
        sessionStorage.setItem("loggedIn", "true");

        // Redirect to the admin dashboard
        window.location.href = ".index.html"; // Redirect to the admin dashboard after successful login
    } else {
        alert("Invalid username or password.");
    }
}


const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');