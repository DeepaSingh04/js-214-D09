document.getElementById('fetch-users').addEventListener('click', fetchUsers);

async function fetchUsers() {
    try {
        const response = await fetch('https://reqres.in/api/users?page=1');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        displayUsers(data.data);
    } catch (error) {
        console.error('Something went wrong:', error);
        document.getElementById('user-container').textContent = 'Failed to fetch users.';
    }
}

function displayUsers(users) {
    const userContainer = document.getElementById('user-container');
    userContainer.innerHTML = ''; // Clear previous results

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
            <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}">
            <h3>${user.first_name} ${user.last_name}</h3>
            <p>${user.email}</p>
        `;
        userContainer.appendChild(userCard);
    });
}
