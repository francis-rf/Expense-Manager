# Quick Setup Guide for Expense Manager

This guide helps you set up the Expense Manager application from scratch.

## Prerequisites

- Python 3.8+
- MySQL 5.7+ or MariaDB
- pip (Python package manager)

## Step-by-Step Setup

### 1. Install MySQL

**Windows:**
- Download from [MySQL Downloads](https://dev.mysql.com/downloads/installer/)
- Install MySQL Server and MySQL Workbench
- Remember the root password you set during installation

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

**macOS:**
```bash
brew install mysql
brew services start mysql
```

### 2. Clone the Repository

```bash
git clone <your-repo-url>
cd expense-manager
```

### 3. Create the Database

**Option 1: Using MySQL CLI**

```bash
# Login to MySQL
mysql -u root -p

# Create database and table
source schema.sql

# Exit MySQL
exit;
```

**Option 2: Using MySQL Workbench (Windows)**

1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Open `schema.sql` file
4. Execute the script (lightning bolt icon)

**Option 3: One-liner**

```bash
mysql -u root -p < schema.sql
```

### 4. Verify Database Setup

```bash
mysql -u root -p -e "USE expense_manager; SHOW TABLES;"
```

You should see:
```
+---------------------------+
| Tables_in_expense_manager |
+---------------------------+
| expenses                  |
+---------------------------+
```

### 5. Configure Environment

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your actual credentials
# Linux/Mac:
nano .env
# Windows:
notepad .env
```

Update these values in `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_ACTUAL_PASSWORD
DB_NAME=expense_manager
```

### 6. Install Python Dependencies

```bash
# Recommended: Create a virtual environment first
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 7. Start the Backend

```bash
fastapi dev backend/server.py
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### 8. Test the API

Open another terminal and test:

```bash
# Health check
curl http://localhost:8000/health

# Should return:
# {"status":"healthy","database":"connected"}
```

### 9. Open the Frontend

**Option 1: Direct file (simple)**
- Navigate to `frontend/` folder
- Double-click `index.html`

**Option 2: Local server (recommended)**
```bash
cd frontend
python -m http.server 3000
```

Then open http://localhost:3000 in your browser.

## Common Issues

### "mysql command not found"

Add MySQL to your PATH:

**Windows:**
- Add `C:\Program Files\MySQL\MySQL Server 8.0\bin` to PATH

**Linux/Mac:**
- MySQL should be in PATH after installation
- Try: `which mysql`

### "Access denied for user 'root'@'localhost'"

Reset MySQL root password:

**Linux:**
```bash
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'new_password';
FLUSH PRIVILEGES;
exit;
```

**Windows:**
- Use MySQL Workbench to reset password

### Port 8000 already in use

Kill the process or use a different port:
```bash
# Find process
# Linux/Mac:
lsof -i :8000
# Windows:
netstat -ano | findstr :8000

# Use different port
fastapi dev backend/server.py --port 8001
```

## Verify Everything Works

1. Open frontend (http://localhost:3000)
2. Add an expense:
   - Date: Today
   - Category: Food
   - Notes: Test expense
   - Amount: 100
3. Click "Add Expense"
4. You should see it appear in "Recent Expenses"
5. Switch to "Analytics & Insights" tab
6. Set date range and click "Analyze"
7. You should see the expense in the breakdown

## Next Steps

- Add more test expenses
- Try the delete functionality
- Explore the API at http://localhost:8000/docs
- Run tests: `pytest`

## Need Help?

Check the main README.md for more detailed information about:
- API endpoints
- Testing
- Docker deployment
