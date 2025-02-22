
document.addEventListener("DOMContentLoaded", () => {
    fetch("/dash/components/navbar.html")
        .then((response) => response.text())
        .then(
            (data) => (document.getElementById("navbar-container").innerHTML = data)
        )
        .catch((error) => console.error("Error loading navbar"));
});

// -------------------------------
    document.addEventListener("DOMContentLoaded", () => {
        fetch("/dash/components/footer.html")
            .then((response) => response.text())
            .then(
                (data) => (document.getElementById("footer-container").innerHTML = data)
            )
            .catch((error) => console.error("Error loading footer"));
    });
// ===============Dark mode====================


// function toggleDarkMode() {
//     document.body.classList.toggle("dark-mode");
//     document.querySelector(".container").classList.toggle("dark-mode");

//     // Store the theme preference in localStorage
//     const isDarkMode = document.body.classList.contains("dark-mode");
//     localStorage.setItem("theme", isDarkMode ? "dark" : "light");
// }

// // Apply dark mode on page load if previously selected
// document.addEventListener("DOMContentLoaded", () => {
//     if (localStorage.getItem("theme") === "dark") {
//         toggleDarkMode();
//     }
// });