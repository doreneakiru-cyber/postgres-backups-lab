// Global Application State
let totalBudget = 0;
let expenses = []; // Array to store multiple expense records

// DOM Elements
const budgetInput = document.getElementById('budget-input');
const setBudgetBtn = document.getElementById('set-budget-btn');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const addExpenseBtn = document.getElementById('add-expense-btn');

const totalBudgetDisplay = document.getElementById('total-budget');
const totalExpensesDisplay = document.getElementById('total-expenses');
const remainingBalanceDisplay = document.getElementById('remaining-balance');
const expenseList = document.getElementById('expense-list');
const feedbackText = document.getElementById('feedback-text');

// 1. Event Listener: Set Budget
setBudgetBtn.addEventListener('click', function() {
    const amount = parseFloat(budgetInput.value);
    
    // Conditionals: Validate input
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid positive number for your budget.');
        return;
    }

    totalBudget = amount;
    budgetInput.value = '';
    updateDashboard();
});

// 2. Event Listener: Add Expense
addExpenseBtn.addEventListener('click', function() {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    // Conditionals: Validate expense entries
    if (name === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense name and amount.');
        return;
    }

    // Store record in the expenses array
    const newExpense = { name: name, amount: amount };
    expenses.push(newExpense);

    // Clear form inputs
    expenseNameInput.value = '';
    expenseAmountInput.value = '';

    updateDashboard();
});

// 3. Core Function to Process Data, Run Conditionals, and Update DOM
function updateDashboard() {
    // Process expenses using a loop to calculate total expenses
    let totalExpenses = 0;
    expenseList.innerHTML = ''; // Clear current list DOM

    for (let i = 0; i < expenses.length; i++) {
        let currentExpense = expenses[i];
        totalExpenses += currentExpense.amount;

        // Create list item elements dynamically
        const li = document.createElement('li');
        li.innerHTML = `<span>${currentExpense.name}</span> <span>$${currentExpense.amount.toFixed(2)}</span>`;
        expenseList.appendChild(li);
    }

    // Calculate remaining balance
    const remainingBalance = totalBudget - totalExpenses;

    // Update DOM text displays
    totalBudgetDisplay.textContent = `$${totalBudget.toFixed(2)}`;
    totalExpensesDisplay.textContent = `$${totalExpenses.toFixed(2)}`;
    remainingBalanceDisplay.textContent = `$${remainingBalance.toFixed(2)}`;

    // Decision Making: Provide conditional feedback based on spending status
    if (totalBudget === 0) {
        feedbackText.textContent = "Please set your total budget to start tracking.";
        feedbackText.style.backgroundColor = "#e8f4fd";
        feedbackText.style.color = "#1d6fa5";
    } else if (remainingBalance < 0) {
        feedbackText.textContent = "Warning! You have exceeded your budget!";
        feedbackText.style.backgroundColor = "#fde8e8";
        feedbackText.style.color = "#c53030";
    } else if (remainingBalance === 0) {
        feedbackText.textContent = "Notice: Your budget is completely exhausted.";
        feedbackText.style.backgroundColor = "#fffaf0";
        feedbackText.style.color = "#dd6b20";
    } else if (remainingBalance <= totalBudget * 0.2) {
        feedbackText.textContent = "Caution: You are running low on funds (less than 20% remaining).";
        feedbackText.style.backgroundColor = "#fffaf0";
        feedbackText.style.color = "#dd6b20";
    } else {
        feedbackText.textContent = "Great job! Your budget is healthy and under control.";
        feedbackText.style.backgroundColor = "#f0fff4";
        feedbackText.style.color = "#276749";
    }
}