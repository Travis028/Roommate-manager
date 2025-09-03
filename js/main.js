// Data storage
let chores = JSON.parse(localStorage.getItem('chores')) || [];
let bills = JSON.parse(localStorage.getItem('bills')) || [];
let events = JSON.parse(localStorage.getItem('events')) || [];
let roommates = JSON.parse(localStorage.getItem('roommates')) || [
    { name: 'John', email: 'john@example.com', phone: '123-456-7890' },
    { name: 'Jane', email: 'jane@example.com', phone: '098-765-4321' }
];

// Save data to localStorage
function saveData() {
    localStorage.setItem('chores', JSON.stringify(chores));
    localStorage.setItem('bills', JSON.stringify(bills));
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('roommates', JSON.stringify(roommates));
}

// Tab navigation
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    // Show the current tab and add active class to the button
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');

    // Render the appropriate content
    if (tabName === 'dashboard') {
        renderDashboard();
    } else if (tabName === 'chores') {
        renderChores();
    } else if (tabName === 'bills') {
        renderBills();
    } else if (tabName === 'calendar') {
        renderEvents();
    } else if (tabName === 'roommates') {
        renderRoommates();
    }
}

// Render functions
function renderDashboard() {
    const dashboardContent = document.getElementById('dashboard-content');
    if (!dashboardContent) return;

    // Calculate stats
    const totalChores = chores.length;
    const completedChores = chores.filter(chore => chore.completed).length;
    const pendingBills = bills.filter(bill => !bill.paid).length;
    const totalRoommates = roommates.length;
    const upcomingEvents = events.filter(event => new Date(event.date) >= new Date()).length;

    // Update dashboard stats
    document.getElementById('chores-count').textContent = `${completedChores}/${totalChores}`;
    document.getElementById('bills-count').textContent = pendingBills;
    document.getElementById('roommates-count').textContent = totalRoommates;
    document.getElementById('events-count').textContent = upcomingEvents;

    // Render recent chores
    const recentChoresList = document.getElementById('recent-chores');
    if (recentChoresList) {
        recentChoresList.innerHTML = chores
            .slice(0, 5)
            .map(chore => `
                <li class="chore-item">
                    <div>
                        <strong>${chore.name}</strong>
                        <div class="text-muted">Assigned to: ${chore.assignedTo}</div>
                    </div>
                    <button class="btn btn-sm ${chore.completed ? 'btn-success' : 'btn-secondary'}" 
                            onclick="markChoreComplete('${chore.id}')">
                        ${chore.completed ? 'Completed' : 'Mark Complete'}
                    </button>
                </li>
            `)
            .join('');
    }

    // Render upcoming bills
    const upcomingBillsList = document.getElementById('upcoming-bills');
    if (upcomingBillsList) {
        const sortedBills = [...bills]
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .slice(0, 5);

        upcomingBillsList.innerHTML = sortedBills
            .map(bill => `
                <li class="bill-item">
                    <div>
                        <strong>${bill.name}</strong>
                        <div class="text-muted">
                            $${bill.amount} • Due: ${new Date(bill.dueDate).toLocaleDateString()}
                        </div>
                    </div>
                    <button class="btn btn-sm ${bill.paid ? 'btn-success' : 'btn-warning'}" 
                            onclick="markBillPaid('${bill.id}')">
                        ${bill.paid ? 'Paid' : 'Mark Paid'}
                    </button>
                </li>
            `)
            .join('');
    }
}

// Add other render functions (renderChores, renderBills, renderEvents, renderRoommates)
// and other functions (addChore, markChoreComplete, addBill, markBillPaid, addEvent, addRoommate)
// from the original script tag here...

// Initialize the app
window.onload = function() {
    // Set up tab navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showTab(tabName);
        });
    });

    // Set up form submissions
    const choreForm = document.getElementById('chore-form');
    if (choreForm) {
        choreForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addChore();
        });
    }

    const billForm = document.getElementById('bill-form');
    if (billForm) {
        billForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addBill();
        });
    }

    const eventForm = document.getElementById('event-form');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addEvent();
        });
    }

    const roommateForm = document.getElementById('roommate-form');
    if (roommateForm) {
        roommateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addRoommate();
        });
    }

    // Show default tab
    showTab('dashboard');
};
