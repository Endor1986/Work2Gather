// public/js/frontend.js

// Funktion: Daten abrufen und anzeigen
async function fetchData(url, elementId, type = 'view') {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch from ${url}, Status: ${response.status}`);
        }

        const data = await response.json();
        const list = document.getElementById(elementId);

        // Bestehende Inhalte entfernen
        list.innerHTML = '';

        // Daten formatieren und hinzufügen
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = formatData(item, type);
            list.appendChild(listItem);

            // Für die Zuweisungs-Auswahllisten
            if (type === 'task') {
                addOptionToSelect('assign-task', item.id, item.title);
            } else if (type === 'user') {
                addOptionToSelect('assign-user', item.id, item.name);
            }
        });
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        const list = document.getElementById(elementId);
        list.innerHTML = `<li class="error">Error loading data...</li>`;
    }
}

// Funktion: Daten formatieren
function formatData(data, type) {
    if (type === 'task') {
        return `
            <strong>${data.title}</strong> - ${data.status}
            <br>Assigned to: ${data.assignedTo?.join(', ') || 'None'}
            <br><button class="delete-task-button" data-id="${data.id}">Delete Task</button>
        `;
    } else if (type === 'user') {
        return `
            <strong>${data.name}</strong> (${data.email})
            <br>Role: ${data.role}
            <br><button class="delete-user-button" data-id="${data.id}">Delete Employee</button>
        `;
    }
    return JSON.stringify(data);
}

// Funktion: Option zu Dropdown hinzufügen
function addOptionToSelect(selectId, value, text) {
    const select = document.getElementById(selectId);
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    select.appendChild(option);
}

// Funktion: Kombinierte Ansicht von Tasks und Employern abrufen und anzeigen
async function fetchCombinedData() {
    try {
        const response = await fetch('/api/tasks/combined');

        if (!response.ok) {
            throw new Error(`Failed to fetch combined data, Status: ${response.status}`);
        }

        const data = await response.json();
        const combinedList = document.getElementById('combined-list');

        // Bestehende Inhalte entfernen
        combinedList.innerHTML = '';

        // Daten anzeigen
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>Task:</strong> ${item.taskTitle} <br>
                <strong>Assigned to:</strong> ${item.assignedUsers || 'None'}
            `;
            combinedList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching combined data:', error);
    }
}

// Event-Handler: Neues Task hinzufügen
document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value.trim();
    const description = document.getElementById('task-description').value.trim();

    if (!title || !description) {
        alert('Please fill out all fields for the task.');
        return;
    }

    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: Date.now().toString(), title, description, assignedTo: [] })
        });

        if (response.ok) {
            fetchData('/api/tasks', 'task-list', 'task');
            document.getElementById('task-form').reset(); // Formular zurücksetzen
        } else {
            console.error('Failed to add task:', await response.text());
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
});

// Event-Handler: Neuer Benutzer hinzufügen
document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const role = document.getElementById('user-role').value;

    if (!name || !email) {
        alert('Please fill out all fields for the employee.');
        return;
    }

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: Date.now().toString(), name, email, role })
        });

        if (response.ok) {
            fetchData('/api/users', 'open-task-users-list', 'user');
            document.getElementById('user-form').reset(); // Formular zurücksetzen
        } else {
            console.error('Failed to add user:', await response.text());
        }
    } catch (error) {
        console.error('Error adding user:', error);
    }
});

// Event-Handler: Task zuweisen
document.getElementById('assign-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskId = document.getElementById('assign-task').value;
    const userId = document.getElementById('assign-user').value;

    if (!taskId || !userId) {
        alert('Please select both a task and an employee.');
        return;
    }

    try {
        const response = await fetch(`/api/tasks/${taskId}/assign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });

        if (response.ok) {
            fetchData('/api/tasks', 'task-list', 'task');
            fetchCombinedData(); // Kombinierte Ansicht aktualisieren
        } else {
            console.error('Failed to assign task:', await response.text());
        }
    } catch (error) {
        console.error('Error assigning task:', error);
    }
});

// Event-Handler: Task löschen
document.addEventListener('click', async (e) => {
    if (e.target && e.target.classList.contains('delete-task-button')) {
        const taskId = e.target.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this task?')) {
            try {
                const response = await fetch(`/api/tasks/${taskId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    fetchData('/api/tasks', 'task-list', 'task');
                    fetchCombinedData(); // Kombinierte Ansicht aktualisieren
                } else {
                    console.error('Failed to delete task:', await response.text());
                }
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    }
});

// Event-Handler: Benutzer löschen
document.addEventListener('click', async (e) => {
    if (e.target && e.target.classList.contains('delete-user-button')) {
        const userId = e.target.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this employee?')) {
            try {
                const response = await fetch(`/api/users/${userId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    fetchData('/api/users', 'open-task-users-list', 'user');
                    fetchData('/api/tasks', 'task-list', 'task');
                    fetchCombinedData(); // Kombinierte Ansicht aktualisieren
                } else {
                    const errorData = await response.json();
                    alert(`Failed to delete employee: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    }
});

// Daten beim Laden der Seite abrufen
document.addEventListener('DOMContentLoaded', () => {
    fetchData('/api/tasks', 'task-list', 'task');
    fetchData('/api/users', 'open-task-users-list', 'user');
    fetchCombinedData();
});
