const addBtn = document.getElementById('add');
const placeEl = document.getElementById('place');
const amountEl = document.getElementById('amount');
const dateEl = document.getElementById('date');
const listEl = document.getElementById('list');
const totalEl = document.getElementById('total');

const STORAGE_KEY = 'expenses_db';

function loadExpenses() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        return [
            {place: 'Butcher', amount: 5, date: `15/11/2025`},
            {place: 'Super Market', amount: 8.20, date: `15/11/2025`}
        ];
    }
    try {
        return JSON.parse(data);
    }
    catch (e) {
        console.error('Error parsing list from localStorage', e);
        return [];
    }
}

function saveExpenses() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    saveExpenses();
    renderExpenses();
    totalCalculation();
}

function totalCalculation() {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }
    totalEl.textContent = `${total.toFixed(2)}€`;
}

function renderExpenses() {
    listEl.innerHTML = '';
    for (let i = 0; i < expenses.length; i++) {
        const li = document.createElement('li');

        li.innerHTML = `
            ${expenses[i].place}: ${expenses[i].amount}€ - ${expenses[i].date}
            <button class="deleteBtn">X</button>
        `;

        const delBtn = li.querySelector('.deleteBtn');
        delBtn.addEventListener('click', function() {
            deleteExpense(i);
        });

        listEl.appendChild(li);
    }
}

let expenses = loadExpenses();

renderExpenses();
totalCalculation();

addBtn.addEventListener('click', function() {
    const place = placeEl.value;
    const amount = +amountEl.value;
    let date = dateEl.value;

    // if ((!place) || (!amount)) return;

    if(amount <= 0) return;

    if (!date) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        date = `${day}/${month}/${year}`;
    }

    const expense = {
        place: place,
        amount: amount,
        date: date,
    }

    expenses.push(expense);
    saveExpenses();

    renderExpenses();
    totalCalculation();

    placeEl.value = "";
    amountEl.value = "";
    dateEl.value = "";
    placeEl.focus();
});