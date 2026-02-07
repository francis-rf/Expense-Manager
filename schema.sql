-- Expense Manager Database Schema
-- This script creates the database and table structure needed for the Expense Manager application

-- Create database
CREATE DATABASE IF NOT EXISTS expense_manager;
USE expense_manager;

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    expense_date DATE NOT NULL,
    category VARCHAR(100) NOT NULL,
    notes TEXT,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_expense_date (expense_date),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data (optional - remove if you don't want test data)
-- INSERT INTO expenses (expense_date, category, notes, amount) VALUES
-- ('2024-08-01', 'Food', 'Lunch at restaurant', 250.00),
-- ('2024-08-01', 'Transport', 'Taxi fare', 150.00),
-- ('2024-08-02', 'Shopping', 'Groceries', 800.00);
