const API_URL = "https://jsonplaceholder.typicode.com/users";
const userList = document.getElementById("userList");
const errorMessage = document.getElementById("error");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUserData() {
  userList.innerHTML = "";
  errorMessage.textContent = "";

  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    users.forEach(user => {
      const userDiv = document.createElement("div");
      userDiv.className = "user";
      userDiv.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;
      userList.appendChild(userDiv);
    });

  } catch (error) {
    errorMessage.textContent = `Failed to fetch user data: ${error.message}`;
  }
}

reloadBtn.addEventListener("click", fetchUserData);

// Load data on initial page load
window.onload = fetchUserData;
