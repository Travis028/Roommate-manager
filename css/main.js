// Data storage
let chores = JSON.parse(localStorage.getItem('chores')) || [
    { id: 1, task: 'Clean kitchen', assignedTo: 'Alex', dueDate: '2023-06-15', completed: false },
    { id: 2, task: 'Take out trash', assignedTo: 'Sam', dueDate: '2023-06-14', completed: true },
    { id: 3, task: 'Vacuum living room', assignedTo: 'Jordan', dueDate: '2023-06-16', completed: false }
];

let bills = JSON.parse(localStorage.getItem('bills')) || [
    { id: 1, name: 'Electricity', amount: 120, dueDate: '2023-06-20', paid: false },
    { id: 2, name: 'Internet', amount: 80, dueDate: '2023-06-15', paid: true },
    { id: 3, name: 'Water', amount: 60, dueDate: '2023-06-18', paid: false }
];

let events = JSON.parse(localStorage.getItem('events')) || [
    { id: 1, title: 'Grocery shopping', date: '2023-06-15', participants: ['Alex', 'Sam'] },
    { id: 2, title: 'House meeting', date: '2023-06-17', participants: ['Everyone'] },
    { id: 3, title: 'Rent due', date: '2023-06-20', participants: ['Everyone'] }
];

let roommates = JSON.parse(localStorage.getItem('roommates')) || [
    { id: 1, name: 'Alex', email: 'alex@example.com', phone: '555-1234' },
    { id: 2, name: 'Sam', email: 'sam@example.com', phone: '555-5678' },
    { id: 3, name: 'Jordan', email: 'jordan@example.com', phone: '555-9012' }
];

let notifications = JSON.parse(localStorage.getItem('notifications')) || [
    'Electricity bill due in 5 days',
    'Jordan has not completed their chore: Vacuum living room',
    'Sam paid the Internet bill'
];

// Save data to localStorage
function saveData() {
    localStorage.setItem('chores', JSON.stringify(chores));
    localStorage.setItem('bills', JSON.stringify(bills));
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('roommates', JSON.stringify(roommates));
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

// Tab navigation
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Deactivate all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Activate selected button
    document.querySelector(`.tab-btn[onclick="showTab('${tabName}')"]`).classList.add('active');
    
    // Refresh data if needed
    if (tabName === 'chores') renderChores();
    if (tabName === 'bills') renderBills();
    if (tabName === 'calendar') renderEvents();
    if (tabName === 'roommates') renderRoommates();
}

// Render functions
function renderDashboard() {
    // Update summary cards
    const pendingChores = chores.filter(chore => !chore.completed).length;
    const unpaidBills = bills.filter(bill => !bill.paid).length;
    
    document.getElementById('pending-chores-count').textContent = pendingChores;
    document.getElementById('unpaid-bills-count').textContent = unpaidBills;
    document.getElementById('upcoming-events-count').textContent = events.length;
    
    // Render recent chores
    const recentChoresList = document.getElementById('recent-chores');
    recentChoresList.innerHTML = '';
    
    chores.slice(0, 3).forEach(chore => {
        const li = document.createElement('li');
        li.className = 'chore-item';
        li.innerHTML = `
            <div>
                <strong>${chore.task}</strong>
                <div>Assigned to: ${chore.assignedTo} | Due: ${chore.dueDate}</div>
            </div>
            <div class="chore-actions">
                ${!chore.completed ? 
                    `<button class="btn btn-complete" onclick="markChoreComplete(${chore.id})">Complete</button>` : ''}
                <span style="color: ${chore.completed ? '#38b44a' : '#ff6b6b'}">
                    ${chore.completed ? 'Done' : 'Pending'}
                </span>
            </div>
        `;
        recentChoresList.appendChild(li);
    });
    
    // Render recent bills
    const recentBillsList = document.getElementById('recent-bills');
    recentBillsList.innerHTML = '';
    
    bills.slice(0, 3).forEach(bill => {
        const li = document.createElement('li');
        li.className = 'bill-item';
        li.innerHTML = `
            <div>
                <strong>${bill.name}</strong>
                <div>Amount: $${bill.amount} | Due: ${bill.dueDate}</div>
            </div>
            <div class="bill-actions">
                ${!bill.paid ? 
                    `<button class="btn btn-complete" onclick="markBillPaid(${bill.id})">Mark Paid</button>` : ''}
                <span style="color: ${bill.paid ? '#38b44a' : '#ff6b6b'}">
                    ${bill.paid ? 'Paid' : 'Pending'}
                </span>
            </div>
        `;
        recentBillsList.appendChild(li);
    });
    
    // Render upcoming events
    const upcomingEventsList = document.getElementById('upcoming-events');
    upcomingEventsList.innerHTML = '';
    
    events.slice(0, 3).forEach(event => {
        const li = document.createElement('li');
        li.className = 'event-item';
        li.innerHTML = `
            <div>
                <strong>${event.title}</strong>
                <div>Date: ${event.date}</div>
                <div>Participants: ${event.participants.join(', ')}</div>
            </div>
        `;
        upcomingEventsList.appendChild(li);
    });
    
    // Render roommates
    const roommateList = document.getElementById('roommate-list');
    roommateList.innerHTML = '';
    
    roommates.forEach(roommate => {
        const card = document.createElement('div');
        card.className = 'roommate-card';
        card.innerHTML = `
            <i class="fas fa-user-circle" style="font-size: 60px; color: #4a69bd;"></i>
            <h3>${roommate.name}</h3>
            <p>${roommate.email}</p>
            <p>${roommate.phone}</p>
        `;
        roommateList.appendChild(card);
    });
    
    // Render notifications
    const notificationList = document.getElementById('notification-list');
    notificationList.innerHTML = '';
    
    notifications.slice(0, 5).forEach(notification => {
        const li = document.createElement('li');
        li.className = 'notification-item';
        li.innerHTML = `
            <i class="fas fa-info-circle" style="color: #ffce30; margin-right: 10px;"></i>
            ${notification}
        `;
        notificationList.appendChild(li);
    });
    
    // Update roommate dropdowns
    const assigneeSelect = document.getElementById('chore-assignee');
    assigneeSelect.innerHTML = '<option value="">Select roommate</option>';
    
    roommates.forEach(roommate => {
        const option = document.createElement('option');
        option.value = roommate.name;
        option.textContent = roommate.name;
        assigneeSelect.appendChild(option);
    });
}

function renderChores() {
    const allChoresList = document.getElementById('all-chores');
    allChoresList.innerHTML = '';
    
    chores.forEach(chore => {
        const li = document.createElement('li');
        li.className = 'chore-item';
        li.innerHTML = `
            <div>
                <strong>${chore.task}</strong>
                <div>Assigned to: ${chore.assignedTo} | Due: ${chore.dueDate}</div>
            </div>
            <div class="chore-actions">
                ${!chore.completed ? 
                    `<button class="btn btn-complete" onclick="markChoreComplete(${chore.id})">Complete</button>` : ''}
                <span style="color: ${chore.completed ? '#38b44a' : '#ff6b6b'}">
                    ${chore.completed ? 'Done' : 'Pending'}
                </span>
            </div>
        `;
        allChoresList.appendChild(li);
    });
}

function renderBills() {
    const allBillsList = document.getElementById('all-bills');
    allBillsList.innerHTML = '';
    
    bills.forEach(bill => {
        const li = document.createElement('li');
        li.className = 'bill-item';
        li.innerHTML = `
            <div>
                <strong>${bill.name}</strong>
                <div>Amount: $${bill.amount} | Due: ${bill.dueDate}</div>
            </div>
            <div class="bill-actions">
                ${!bill.paid ? 
                    `<button class="btn btn-complete" onclick="markBillPaid(${bill.id})">Mark Paid</button>` : ''}
                <span style="color: ${bill.paid ? '#38b44a' : '#ff6b6b'}">
                    ${bill.paid ? 'Paid' : 'Pending'}
                </span>
            </div>
        `;
        allBillsList.appendChild(li);
    });
}

function renderEvents() {
    const allEventsList = document.getElementById('all-events');
    allEventsList.innerHTML = '';
    
    events.forEach(event => {
        const li = document.createElement('li');
        li.className = 'event-item';
        li.innerHTML = `
            <div>
                <strong>${event.title}</strong>
                <div>Date: ${event.date}</div>
                <div>Participants: ${event.participants.join(', ')}</div>
            </div>
        `;
        allEventsList.appendChild(li);
    });
}

function renderRoommates() {
    const allRoommatesList = document.getElementById('all-roommates');
    allRoommatesList.innerHTML = '';
    
    roommates.forEach(roommate => {
        const card = document.createElement('div');
        card.className = 'roommate-card';
        card.innerHTML = `
            <i class="fas fa-user-circle" style="font-size: 60px; color: #4a69bd;"></i>
            <h3>${roommate.name}</h3>
            <p>${roommate.email}</p>
            <p>${roommate.phone}</p>
        `;
        allRoommatesList.appendChild(card);
    });
}

// Function to add a new chore
function addChore() {
    const taskInput = document.getElementById('chore-task');
    const assigneeInput = document.getElementById('chore-assignee');
    const dueDateInput = document.getElementById('chore-due-date');
    
    if (taskInput.value && assigneeInput.value && dueDateInput.value) {
        const newChore = {
            id: chores.length > 0 ? Math.max(...chores.map(c => c.id)) + 1 : 1,
            task: taskInput.value,
            assignedTo: assigneeInput.value,
            dueDate: dueDateInput.value,
            completed: false
        };
        
        chores.push(newChore);
        saveData();
        
        // Add notification
        notifications.unshift(`New chore added: ${newChore.task}`);
        saveData();
        
        // Clear inputs
        taskInput.value = '';
        assigneeInput.value = '';
        dueDateInput.value = '';
        
        // Re-render
        renderDashboard();
        renderChores();
        
        alert('Chore added successfully!');
    } else {
        alert('Please fill in all fields');
    }
}

// Function to mark a chore as complete
function markChoreComplete(id) {
    chores = chores.map(chore => 
        chore.id === id ? { ...chore, completed: true } : chore
    );
    saveData();
    
    // Add notification
    const completedChore = chores.find(c => c.id === id);
    notifications.unshift(`Chore marked as complete: ${completedChore.task}`);
    saveData();
    
    // Re-render
    renderDashboard();
    renderChores();
}

// Function to add a new bill
function addBill() {
    const nameInput = document.getElementById('bill-name');
    const amountInput = document.getElementById('bill-amount');
    const dueDateInput = document.getElementById('bill-due-date');
    
    if (nameInput.value && amountInput.value && dueDateInput.value) {
        const newBill = {
            id: bills.length > 0 ? Math.max(...bills.map(b => b.id)) + 1 : 1,
            name: nameInput.value,
            amount: parseFloat(amountInput.value),
            dueDate: dueDateInput.value,
            paid: false
        };
        
        bills.push(newBill);
        saveData();
        
        // Add notification
        notifications.unshift(`New bill added: ${newBill.name}`);
        saveData();
        
        // Clear inputs
        nameInput.value = '';
        amountInput.value = '';
        dueDateInput.value = '';
        
        // Re-render
        renderDashboard();
        renderBills();
        
        alert('Bill added successfully!');
    } else {
        alert('Please fill in all fields');
    }
}

// Function to mark a bill as paid
function markBillPaid(id) {
    bills = bills.map(bill => 
        bill.id === id ? { ...bill, paid: true } : bill
    );
    saveData();
    
    // Add notification
    const paidBill = bills.find(b => b.id === id);
    notifications.unshift(`Bill marked as paid: ${paidBill.name}`);
    saveData();
    
    // Re-render
    renderDashboard();
    renderBills();
}

// Function to add a new event
function addEvent() {
    const titleInput = document.getElementById('event-title');
    const dateInput = document.getElementById('event-date');
    const participantsInput = document.getElementById('event-participants');
    
    if (titleInput.value && dateInput.value) {
        const newEvent = {
            id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
            title: titleInput.value,
            date: dateInput.value,
            participants: participantsInput.value ? participantsInput.value.split(',').map(p => p.trim()) : []
        };
        
        events.push(newEvent);
        saveData();
        
        // Add notification
        notifications.unshift(`New event added: ${newEvent.title}`);
        saveData();
        
        // Clear inputs
        titleInput.value = '';
        dateInput.value = '';
        participantsInput.value = '';
        
        // Re-render
        renderDashboard();
        renderEvents();
        
        alert('Event added successfully!');
    } else {
        alert('Please fill in all required fields');
    }
}

// Function to add a new roommate
function addRoommate() {
    const nameInput = document.getElementById('roommate-name');
    const emailInput = document.getElementById('roommate-email');
    const phoneInput = document.getElementById('roommate-phone');
    
    if (nameInput.value && emailInput.value) {
        const newRoommate = {
            id: roommates.length > 0 ? Math.max(...roommates.map(r => r.id)) + 1 : 1,
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value
        };
        
        roommates.push(newRoommate);
        saveData();
        
        // Add notification
        notifications.unshift(`New roommate added: ${newRoommate.name}`);
        saveData();
        
        // Clear inputs
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        
        // Re-render
        renderDashboard();
        renderRoommates();
        
        // Update roommate dropdowns
        const assigneeSelect = document.getElementById('chore-assignee');
        assigneeSelect.innerHTML = '<option value="">Select roommate</option>';
        
        roommates.forEach(roommate => {
            const option = document.createElement('option');
            option.value = roommate.name;
            option.textContent = roommate.name;
            assigneeSelect.appendChild(option);
        });
        
        alert('Roommate added successfully!');
    } else {
        alert('Please fill in all required fields');
    }
}

// Initialize the app
window.onload = function() {
    renderDashboard();
    
    // Set up roommate dropdown
    const assigneeSelect = document.getElementById('chore-assignee');
    assigneeSelect.innerHTML = '<option value="">Select roommate</option>';
    
    roommates.forEach(roommate => {
        const option = document.createElement('option');
        option.value = roommate.name;
        option.textContent = roommate.name;
        assigneeSelect.appendChild(option);
    });
    
    // Set today's date as default for date inputs
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('chore-due-date').value = today;
    document.getElementById('bill-due-date').value = today;
    document.getElementById('event-date').value = today;
};