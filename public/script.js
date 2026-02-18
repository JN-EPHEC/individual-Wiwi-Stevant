function init() {
    loadUsers();
    document.getElementById('userForm').addEventListener('submit', addUser);
}

async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.firstName} ${user.lastName}`;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

async function addUser(event) {
    event.preventDefault();
    const firstName = document.getElementById('prenom').value;
    const lastName = document.getElementById('nom').value;
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName })
        });
        if (response.ok) {
            document.getElementById('userForm').reset();
            loadUsers();
        } else {
            console.error('Error adding user');
        }
    } catch (error) {
        console.error('Error adding user:', error);
    }
}
