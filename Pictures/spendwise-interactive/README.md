# SpendWise Interactive Budgeting Dashboard

## Overview
SpendWise is an interactive web-based budgeting application designed to help users track their total budget, log multiple expenses, monitor remaining balances, and receive real-time financial health feedback.

## Features & Implementation
- **Conditional Statements (`if/else`):** Used to evaluate user input validity, determine spending status, and dynamically change feedback messages when funds are running low or a budget deficit occurs.
- **Arrays (`[]`):** Stores multiple expense records dynamically as objects (`{ name, amount }`), enabling easy record management without individual variables.
- **Loops (`for`):** Iterates through the stored expense array to calculate total spending and dynamically build list items.
- **DOM Manipulation:** Updates summary text elements and appends items directly onto the live webpage rather than using the console.
- **Event Listeners (`addEventListener`):** Captures user clicks on buttons to trigger budget updates and form submissions seamlessly.

## Challenges Faced & Solutions
- *Challenge:* Clearing previous entries from the UI without duplicating list items during rerendering.
  *Solution:* Resetting `expenseList.innerHTML = ''` at the beginning of the `updateDashboard()` loop cycle before rebuilding the list elements from the array.