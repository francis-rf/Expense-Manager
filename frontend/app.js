// ================================
// CONFIGURATION
// ================================
const API_BASE_URL = '';

// ================================
// STATE MANAGEMENT
// ================================
let currentExpenses = [];
let currentSummary = [];

// ================================
// DOM ELEMENTS
// ================================
const elements = {
    // Tabs
    tabButtons: document.querySelectorAll('.tab-button'),
    tabContents: document.querySelectorAll('.tab-content'),
    
    // Expense Form
    expenseForm: document.getElementById('expenseForm'),
    expenseDate: document.getElementById('expenseDate'),
    expenseCategory: document.getElementById('expenseCategory'),
    expenseNotes: document.getElementById('expenseNotes'),
    expenseAmount: document.getElementById('expenseAmount'),
    
    // Expense List
    expenseList: document.getElementById('expenseList'),
    filterDate: document.getElementById('filterDate'),
    filterBtn: document.getElementById('filterBtn'),
    clearFilterBtn: document.getElementById('clearFilterBtn'),
    
    // Analytics
    startDate: document.getElementById('startDate'),
    endDate: document.getElementById('endDate'),
    analyzBtn: document.getElementById('analyzBtn'),
    categoryBreakdown: document.getElementById('categoryBreakdown'),
    totalSpent: document.getElementById('totalSpent'),
    topCategory: document.getElementById('topCategory'),
    dailyAverage: document.getElementById('dailyAverage'),
    
    // Header Stats
    totalExpenses: document.getElementById('totalExpenses'),
    monthExpenses: document.getElementById('monthExpenses'),
    
    // Toast
    toast: document.getElementById('toast')
};

// ================================
// INITIALIZATION
// ================================
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeForm();
    setDefaultDates();
    loadTodayExpenses();
    updateHeaderStats();
});

// ================================
// TAB FUNCTIONALITY
// ================================
function initializeTabs() {
    elements.tabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
    });
}

function switchTab(tabName) {
    // Update buttons
    elements.tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    // Update content
    elements.tabContents.forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}-tab`);
    });
}

// ================================
// FORM FUNCTIONALITY
// ================================
function initializeForm() {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    elements.expenseDate.value = today;
    
    // Form submission
    elements.expenseForm.addEventListener('submit', handleAddExpense);
    
    // Filter buttons
    if (elements.filterBtn) {
        elements.filterBtn.addEventListener('click', loadFilteredExpenses);
    }
    if (elements.clearFilterBtn) {
        elements.clearFilterBtn.addEventListener('click', clearFilter);
    }
    
    // Analytics button
    if (elements.analyzBtn) {
        elements.analyzBtn.addEventListener('click', loadAnalytics);
    }
}

function setDefaultDates() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    elements.startDate.value = firstDay.toISOString().split('T')[0];
    elements.endDate.value = today.toISOString().split('T')[0];
}

// ================================
// API CALLS
// ================================
async function handleAddExpense(e) {
    e.preventDefault();
    
    const expense = {
        category: elements.expenseCategory.value,
        notes: elements.expenseNotes.value,
        amount: parseFloat(elements.expenseAmount.value)
    };
    
    const date = elements.expenseDate.value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/expenses/${date}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([expense])
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to add expense');
        }
        
        const data = await response.json();
        showToast(`✅ Expense added successfully!`, 'success');
        
        // Reset form
        elements.expenseForm.reset();
        elements.expenseDate.value = date;
        
        // Reload expenses if we're viewing the same date
        if (elements.filterDate.value === date || !elements.filterDate.value) {
            loadTodayExpenses();
        }
        
        updateHeaderStats();
    } catch (error) {
        showToast(`❌ Error: ${error.message}`, 'error');
        console.error('Error adding expense:', error);
    }
}

async function loadTodayExpenses() {
    const today = new Date().toISOString().split('T')[0];
    await loadExpensesForDate(today);
}

async function loadFilteredExpenses() {
    const date = elements.filterDate.value;
    if (!date) {
        showToast('⚠️ Please select a date to filter', 'error');
        return;
    }
    await loadExpensesForDate(date);
}

async function loadExpensesForDate(date) {
    try {
        const response = await fetch(`${API_BASE_URL}/expenses/${date}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
        
        currentExpenses = await response.json();
        console.log("Fetched expenses:", currentExpenses); // Debug logging
        renderExpenseList(currentExpenses, date);
    } catch (error) {
        showToast(`❌ Error loading expenses: ${error.message}`, 'error');
        console.error('Error loading expenses:', error);
        renderExpenseList([], date);
    }
}

async function deleteExpense(date) {
    if (!confirm(`Are you sure you want to delete all expenses for ${date}?`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/expenses/${date}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete expenses');
        }
        
        const data = await response.json();
        showToast(`✅ Deleted ${data.deleted_count} expense(s)`, 'success');
        
        // Determine which view to reload
        const filterDateValue = elements.filterDate.value;
        if (filterDateValue) {
            // Reload the specifically filtered date
            await loadExpensesForDate(filterDateValue);
        } else {
            // Reload today's expenses
            await loadTodayExpenses();
        }
        
        updateHeaderStats();
    } catch (error) {
        showToast(`❌ Error: ${error.message}`, 'error');
        console.error('Error deleting expense:', error);
    }
}

async function loadAnalytics() {
    const startDate = elements.startDate.value;
    const endDate = elements.endDate.value;
    
    if (!startDate || !endDate) {
        showToast('⚠️ Please select both start and end dates', 'error');
        return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
        showToast('⚠️ Start date must be before end date', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/summary?start_date=${startDate}&end_date=${endDate}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch summary');
        }
        
        currentSummary = await response.json();
        renderAnalytics(currentSummary, startDate, endDate);
        showToast('✅ Analytics updated', 'success');
    } catch (error) {
        showToast(`❌ Error: ${error.message}`, 'error');
        console.error('Error loading analytics:', error);
        renderAnalytics([], startDate, endDate);
    }
}

async function updateHeaderStats() {
    try {
        // Get current month dates
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const startDate = firstDay.toISOString().split('T')[0];
        const endDate = today.toISOString().split('T')[0];
        
        const response = await fetch(`${API_BASE_URL}/summary?start_date=${startDate}&end_date=${endDate}`);
        
        if (response.ok) {
            const summary = await response.json();
            const monthTotal = summary.reduce((sum, item) => sum + item.total_amount, 0);
            elements.monthExpenses.textContent = `₹${monthTotal.toFixed(2)}`;
        }
        
        // Get all-time total (using a wide date range)
        const allTimeStart = '2020-01-01';
        const allTimeEnd = new Date().toISOString().split('T')[0];
        const allResponse = await fetch(`${API_BASE_URL}/summary?start_date=${allTimeStart}&end_date=${allTimeEnd}`);
        
        if (allResponse.ok) {
            const allSummary = await allResponse.json();
            const totalAll = allSummary.reduce((sum, item) => sum + item.total_amount, 0);
            elements.totalExpenses.textContent = `₹${totalAll.toFixed(2)}`;
        }
    } catch (error) {
        console.error('Error updating header stats:', error);
    }
}

// ================================
// UI RENDERING
// ================================
function renderExpenseList(expenses, date) {
    if (!expenses || expenses.length === 0) {
        elements.expenseList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <p class="empty-text">No expenses found</p>
                <p class="empty-subtext">No expenses recorded for ${formatDate(date)}</p>
            </div>
        `;
        return;
    }
    
    elements.expenseList.innerHTML = expenses.map(expense => `
        <div class="expense-item">
            <div class="expense-info">
                <div class="expense-category">${getCategoryIcon(expense.category)} ${expense.category}</div>
                <div class="expense-notes">${expense.notes}</div>
                <div class="expense-date">${formatDate(expense.expense_date)}</div>
            </div>
            <div class="expense-amount">₹${expense.amount.toFixed(2)}</div>
            <div class="expense-actions">
                <button class="btn btn-danger btn-sm delete-expense-btn" data-date="${expense.expense_date}">
                    🗑️ Delete
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-expense-btn').forEach(button => {
        button.addEventListener('click', function() {
            const dateToDelete = this.getAttribute('data-date');
            deleteExpense(dateToDelete);
        });
    });
}

function renderAnalytics(summary, startDate, endDate) {
    if (summary.length === 0) {
        elements.categoryBreakdown.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📊</div>
                <p class="empty-text">No data available</p>
                <p class="empty-subtext">No expenses found for the selected period</p>
            </div>
        `;
        elements.totalSpent.textContent = '₹0';
        elements.topCategory.textContent = '-';
        elements.dailyAverage.textContent = '₹0';
        return;
    }
    
    // Calculate total
    const total = summary.reduce((sum, item) => sum + item.total_amount, 0);
    
    // Find top category
    const topCat = summary.reduce((max, item) => 
        item.total_amount > max.total_amount ? item : max
    );
    
    // Calculate daily average
    const daysDiff = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
    const dailyAvg = total / daysDiff;
    
    // Update insights
    elements.totalSpent.textContent = `₹${total.toFixed(2)}`;
    elements.topCategory.textContent = topCat.category;
    elements.dailyAverage.textContent = `₹${dailyAvg.toFixed(2)}`;
    
    // Render category breakdown
    elements.categoryBreakdown.innerHTML = summary
        .sort((a, b) => b.total_amount - a.total_amount)
        .map(item => {
            const percentage = (item.total_amount / total) * 100;
            return `
                <div class="category-item">
                    <div class="category-header">
                        <span class="category-name">${getCategoryIcon(item.category)} ${item.category}</span>
                        <span class="category-amount">₹${item.total_amount.toFixed(2)}</span>
                    </div>
                    <div class="category-bar">
                        <div class="category-fill" style="width: ${percentage}%"></div>
                    </div>
                    <div style="text-align: right; margin-top: 0.25rem;">
                        <small style="color: var(--text-secondary);">${percentage.toFixed(1)}%</small>
                    </div>
                </div>
            `;
        }).join('');
}

// ================================
// UTILITY FUNCTIONS
// ================================
function clearFilter() {
    elements.filterDate.value = '';
    loadTodayExpenses();
    showToast('✅ Filter cleared', 'success');
}

function showToast(message, type = 'success') {
    elements.toast.textContent = message;
    elements.toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

function formatDate(dateString) {
    if (!dateString) return 'Invalid Date';
    try {
        const date = new Date(dateString);
        // Check if date is valid
        if (isNaN(date.getTime())) {
            return dateString; // Fallback to returning original string
        }
        return date.toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    } catch (e) {
        console.error("Date parsing error:", e);
        return dateString;
    }
}

function getCategoryIcon(category) {
    const icons = {
        'Food': '🍔',
        'Transport': '🚗',
        'Entertainment': '🎬',
        'Shopping': '🛍️',
        'Bills': '💡',
        'Healthcare': '⚕️',
        'Education': '📚',
        'Other': '📦'
    };
    return icons[category] || '📦';
}

// ================================
// ERROR HANDLING
// ================================
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    showToast('❌ An unexpected error occurred', 'error');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Don't show toast for specific expected errors to avoid spam
});
