document.addEventListener("DOMContentLoaded", function () {
    const userModal = new bootstrap.Modal(document.getElementById('userModal'));
    const userList = document.getElementById("userList");
    const emailFilter = document.getElementById("emailFilter");
    const phoneFilter = document.getElementById("phoneFilter");
    const resetFilters = document.getElementById("resetFilters");
    const sortButtons = document.querySelectorAll(".sort-btn");
    let currentSort = { column: null, order: "asc" };

    // Show modal when 'Add New User' button is clicked
    document.getElementById("addUserBtn").addEventListener("click", function () {
        document.getElementById("userForm").reset();
        document.getElementById("submitBtn").innerText = "Save";
        document.getElementById("userModalLabel").innerText = "Add User";
        document.getElementById("userId").value = '';

        userModal.show();
    });

    // Handle form submission (add or edit user)
    document.getElementById("userForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const userId = document.getElementById("userId").value;
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        if (!username || !email || !phone) {
            alert("Please enter all fields.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (userId) {
            const index = users.findIndex(user => user.id == userId);
            if (index > -1) {
                users[index] = { id: userId, username, email, phone };
            }
        } else {
            const newUser = { id: users.length + 1, username, email, phone };
            users.push(newUser);
        }

        localStorage.setItem("users", JSON.stringify(users));

        userModal.hide();
        loadUserList();
        alert("User saved successfully!");
    });

    // Handle Edit Button Click
    userList.addEventListener("click", function(event) {
        if (event.target.classList.contains("edit-btn")) {
            const userId = event.target.getAttribute("data-id");
            let users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(user => user.id == userId);

            if (user) {
                document.getElementById("userId").value = user.id;
                document.getElementById("username").value = user.username;
                document.getElementById("email").value = user.email;
                document.getElementById("phone").value = user.phone;

                document.getElementById("submitBtn").innerText = "Update";
                document.getElementById("userModalLabel").innerText = "Edit User";

                userModal.show();
            }
        }
    });
 
    // Delete User
    window.deleteUser = function(userId) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.filter(user => user.id != userId);
        localStorage.setItem("users", JSON.stringify(users));
        loadUserList();
        alert("User deleted successfully!");
    }

    // Load User List and Apply Filters/Sorting
    function loadUserList() {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        
        // Apply Filters
        const selectedDomain = emailFilter.value;
        const selectedPrefix = phoneFilter.value;

        if (selectedDomain) {
            users = users.filter(user => user.email.endsWith(selectedDomain));
        }
        if (selectedPrefix) {
            users = users.filter(user => user.phone.startsWith(selectedPrefix));
        }

        // Apply Sorting
        if (currentSort.column) {
            users.sort((a, b) => {
                let aValue = a[currentSort.column].toLowerCase();
                let bValue = b[currentSort.column].toLowerCase();

                return currentSort.order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            });
        }

        // Render Table
        userList.innerHTML = "";
        users.forEach(user => {
            const userEntry = document.createElement("tr");
            userEntry.classList.add("user-entry");
            userEntry.setAttribute("data-id", user.id);
            userEntry.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-btn" data-id="${user.id}">Edit</button>
                    <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            `;
            userList.appendChild(userEntry);
        });

        populateFilters();
    }

    // Populate Filter Options
    function populateFilters() {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let emailDomains = new Set();
        let phonePrefixes = new Set();

        users.forEach(user => {
            emailDomains.add(user.email.split("@")[1]);
            phonePrefixes.add(user.phone.substring(0, 3));
        });

        emailFilter.innerHTML = '<option value="">Filter by Email Domain</option>';
        phoneFilter.innerHTML = '<option value="">Filter by Phone Prefix</option>';

        emailDomains.forEach(domain => {
            emailFilter.innerHTML += `<option value="${domain}">${domain}</option>`;
        });

        phonePrefixes.forEach(prefix => {
            phoneFilter.innerHTML += `<option value="${prefix}">${prefix}</option>`;
        });
    }

    // Apply Filters on Change
    emailFilter.addEventListener("change", loadUserList);
    phoneFilter.addEventListener("change", loadUserList);
    resetFilters.addEventListener("click", function () {
        emailFilter.value = "";
        phoneFilter.value = "";
        loadUserList();
    });

    // Apply Sorting
    sortButtons.forEach(button => {
        button.addEventListener("click", function () {
            const column = this.getAttribute("data-column");
            const order = this.getAttribute("data-order");
            const newOrder = order === "asc" ? "desc" : "asc";

            currentSort = { column, order: newOrder };
            this.setAttribute("data-order", newOrder);
            this.innerHTML = newOrder === "asc" ? "▲" : "▼";

            loadUserList();
        });
    });

    // Initial Load
    loadUserList();
});
