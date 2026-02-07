# Expense Manager 💰

![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-latest-green.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A full-stack expense tracking application with glassmorphism UI, real-time analytics, and comprehensive testing. Built with FastAPI backend and vanilla JavaScript frontend.

## 🎯 Features

- **Glassmorphism UI** — Modern frosted glass design with animated gradients
- **Expense Management** — Add, view, filter, and delete expenses with category tracking
- **Analytics Dashboard** — Visual category breakdown with date range analysis
- **RESTful API** — FastAPI backend with Pydantic validation
- **MySQL Database** — Persistent storage with parameterized queries
- **Comprehensive Testing** — 41+ test cases covering all functionality
- **Logging** — File and console logging for debugging

## 📁 Project Structure

```
expense-manager/
├── backend/
│   ├── server.py           # FastAPI application
│   └── db_helper.py        # Database operations
├── frontend/
│   ├── index.html          # Main HTML structure
│   ├── style.css           # Glassmorphism styling
│   └── app.js              # JavaScript logic
├── tests/
│   └── backend/
│       ├── test_db_helper.py   # Database tests
│       └── test_server.py      # API endpoint tests
├── logs/                   # Application logs
├── schema.sql              # Database setup script
├── SETUP_GUIDE.md          # Detailed setup instructions
├── requirements.txt
└── pyproject.toml          # Pytest configuration
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- MySQL 8.0+

### Database Setup

The project includes a `schema.sql` file for easy database setup. Run it using:

```bash
mysql -u root -p < schema.sql
```

Or manually create the database:

```sql
CREATE DATABASE expense_manager;
USE expense_manager;

CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    expense_date DATE NOT NULL,
    category VARCHAR(100) NOT NULL,
    notes TEXT,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_expense_date (expense_date),
    INDEX idx_category (category)
);
```

For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md).

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd expense-manager
```

2. **Set up MySQL database**

```bash
# Login to MySQL
mysql -u root -p

# Run the schema script
source schema.sql
# OR
mysql -u root -p < schema.sql
```

This creates the `expense_manager` database and `expenses` table.

3. **Install Python dependencies**

```bash
pip install -r requirements.txt
```

4. **Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=expense_manager
```

5. **Run the backend**

```bash
fastapi dev backend/server.py
```

Backend will start at `http://localhost:8000`

6. **Run the frontend**

Open `frontend/index.html` in your browser, or serve it:

```bash
cd frontend
python -m http.server 3000
```

Frontend will be available at `http://localhost:3000`

## 💻 Usage

### API Endpoints

| Method   | Endpoint                           | Description                |
| -------- | ---------------------------------- | -------------------------- |
| `GET`    | `/`                                | API information            |
| `GET`    | `/health`                          | Health check               |
| `GET`    | `/expenses/{date}`                 | Get expenses for a date    |
| `POST`   | `/expenses/{date}`                 | Add expenses for a date    |
| `DELETE` | `/expenses/{date}`                 | Delete expenses for a date |
| `GET`    | `/summary?start_date=X&end_date=Y` | Get expense summary        |

### Example Requests

**Add Expense:**

```bash
curl -X POST "http://localhost:8000/expenses/2025-12-07" \
  -H "Content-Type: application/json" \
  -d '[{"category": "Food", "notes": "Lunch", "amount": 250.50}]'
```

**Get Summary:**

```bash
curl "http://localhost:8000/summary?start_date=2025-12-01&end_date=2025-12-07"
```

## 🧪 Testing

Run all tests:

```bash
pytest
```

Run with coverage:

```bash
pytest --cov=backend --cov-report=html
```

## 🐳 Docker

### Build Image

```bash
docker build -t expense-manager .
```

### Run Container

```bash
docker run -p 8000:8000 --env-file .env expense-manager
```

## 🔧 Troubleshooting

### Database Connection Issues

**Error: "Access denied for user"**

- Check your MySQL credentials in `.env`
- Ensure MySQL user has permissions: `GRANT ALL ON expense_manager.* TO 'root'@'localhost';`

**Error: "Can't connect to MySQL server"**

- Verify MySQL is running: `sudo service mysql status` (Linux) or check services (Windows)
- Check `DB_HOST` in `.env` matches your MySQL host

**Error: "Unknown database 'expense_manager'"**

- Run the schema script: `mysql -u root -p < schema.sql`

### Port Conflicts

If port 8000 or 3000 is already in use:

```bash
# Backend on different port
fastapi dev backend/server.py --port 8001

# Frontend on different port
python -m http.server 3001
```

## 📄 License

MIT License
