<<<<<<< HEAD
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
=======
# 💰 Expense Manager

A modern, full-stack expense tracking application with beautiful glassmorphism UI, real-time analytics, and comprehensive testing.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![License](https://img.shields.io/badge/License-MIT-purple.svg)

## ✨ Features

### 🎨 **Frontend**

- **Modern Glassmorphism Design** - Frosted glass effects with vibrant gradients
- **Animated Background** - Floating gradient orbs for visual appeal
- **Two-Tab Interface**:
  - **Manage Expenses** - Add, view, filter, and delete expenses
  - **Analytics & Insights** - Visual category breakdown with date range analysis
- **Real-time Updates** - Instant feedback with toast notifications
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### ⚙️ **Backend**

- **FastAPI** - High-performance async API
- **RESTful Architecture** - Clean, well-documented endpoints
- **Input Validation** - Pydantic models with strict validation
- **Comprehensive Logging** - File and console logging
- **CORS Support** - Ready for frontend integration
- **Health Check** - Monitor API and database status

### 🧪 **Testing**

- **41+ Test Cases** - Comprehensive coverage of all functionality
- **Unit Tests** - Database layer testing with mocks
- **API Tests** - FastAPI endpoint testing
- **Coverage Reports** - HTML and terminal coverage reports
>>>>>>> 6d7a6676ef3347cbccc0f7da3070b7d2269a13d5

## 📁 Project Structure

```
<<<<<<< HEAD
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
├── requirements.txt
└── pyproject.toml          # Pytest configuration
```

## 🚀 Getting Started
=======
Expenses_project/
├── backend/
│   ├── __init__.py
│   ├── server.py              # FastAPI application
│   └── db_helper.py            # Database operations
├── frontend/
│   ├── index.html              # Main HTML structure
│   ├── style.css               # Glassmorphism styling
│   ├── app.js                  # JavaScript logic
│   └── README.md               # Frontend documentation
├── tests/
│   ├── backend/
│   │   ├── test_db_helper.py  # Database tests
│   │   └── test_server.py      # API endpoint tests
│   └── README.md               # Testing guide
├── requirements.txt            # Python dependencies
├── pyproject.toml              # Pytest configuration
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## 🚀 Quick Start
>>>>>>> 6d7a6676ef3347cbccc0f7da3070b7d2269a13d5

### Prerequisites

- Python 3.8+
<<<<<<< HEAD
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
=======
- MySQL Database
- Modern web browser

### 1. Database Setup

```sql
CREATE DATABASE expense_manager;
>>>>>>> 6d7a6676ef3347cbccc0f7da3070b7d2269a13d5

CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    expense_date DATE NOT NULL,
<<<<<<< HEAD
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
=======
    category VARCHAR(50) NOT NULL,
    notes TEXT,
    amount DECIMAL(10, 2) NOT NULL,
    INDEX idx_date (expense_date)
);
```

### 2. Backend Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd Expenses_project

# Install dependencies
pip install -r requirements.txt

# Configure environment (optional)
cp .env.example .env
# Edit .env with your database credentials

# Run the backend
cd backend
fastapi dev server.py
```

Backend will start at: `http://localhost:8000`

### 3. Frontend Setup

```bash
# In a new terminal
>>>>>>> 6d7a6676ef3347cbccc0f7da3070b7d2269a13d5
cd frontend
python -m http.server 3000
```

<<<<<<< HEAD
Frontend will be available at `http://localhost:3000`

## 💻 Usage

### API Endpoints
=======
Frontend will be available at: `http://localhost:3000`

### 4. Run Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=backend --cov-report=html

# View coverage report
# Open: htmlcov/index.html
```

## 📊 API Endpoints
>>>>>>> 6d7a6676ef3347cbccc0f7da3070b7d2269a13d5

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

<<<<<<< HEAD
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
=======
## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=expense_manager
```

### Database Credentials

If not using environment variables, defaults are:

- Host: `localhost`
- User: `root`
- Password: `1234`
- Database: `expense_manager`

## 🎨 Frontend Usage

### Managing Expenses

1. **Add Expense**:

   - Fill in date, category, notes, and amount
   - Click "Add Expense"
   - See instant confirmation toast

2. **View Expenses**:

   - Auto-loads today's expenses
   - Use filter to view specific dates
   - Click "Clear" to reset filter

3. **Delete Expenses**:
   - Click 🗑️ button next to expense
   - Confirm deletion
   - List updates automatically

### Analytics

1. Select start and end dates
2. Click "Analyze"
3. View:
   - Category breakdown with visual bars
   - Total spent
   - Top spending category
   - Daily average

## 🧪 Testing

### Test Coverage

- **Database Layer**: 11 tests covering all CRUD operations
- **API Layer**: 30+ tests covering all endpoints
- **Total Coverage**: 41+ comprehensive tests

### Running Specific Tests

```bash
# Database tests only
pytest tests/backend/test_db_helper.py -v

# API tests only
pytest tests/backend/test_server.py -v

# Test specific functionality
pytest -k "validation"
pytest -k "error"
```

## 📝 Features in Detail

### Categories

8 pre-defined categories with emoji icons:

- 🍔 Food & Dining
- 🚗 Transport
- 🎬 Entertainment
- 🛍️ Shopping
- 💡 Bills & Utilities
- ⚕️ Healthcare
- 📚 Education
- 📦 Other

### Input Validation

- **Amount**: Must be positive (> 0)
- **Date**: Valid date format required
- **Category**: Must select from predefined list
- **Notes**: Required field

### Error Handling

- Comprehensive error messages
- Toast notifications for user feedback
- Detailed logging for debugging
- Graceful failure handling

## 🎯 Best Practices

### Development

1. **Hard Refresh**: Press `Ctrl+Shift+R` after updating JavaScript
2. **Environment Variables**: Use `.env` for sensitive data
3. **Logging**: Check `app.log` for debugging
4. **Testing**: Run tests before committing

### Production

1. Update CORS origins in `server.py`
2. Use strong database passwords
3. Set appropriate logging levels
4. Use `fastapi run` instead of `fastapi dev`
5. Serve frontend with production server (nginx, Apache)

## 🔍 Troubleshooting

### Common Issues

**Q: Buttons not working?**
A: Hard refresh the browser (`Ctrl+Shift+R`)

**Q: Database connection failed?**
A: Check credentials in `.env` or `db_helper.py`

**Q: CORS errors?**
A: Ensure backend is running and CORS is configured

**Q: Tests failing?**
A: Run `pip install -r requirements.txt` to install dependencies

## 📈 Performance

- **Fast Loading**: Optimized assets and minimal dependencies
- **Async Operations**: Non-blocking database queries
- **Efficient Rendering**: Dynamic DOM updates
- **Hardware Acceleration**: CSS animations use GPU

## 🛡️ Security

- **SQL Injection Prevention**: Parameterized queries
- **Input Validation**: Pydantic models
- **CORS Configuration**: Configurable origins
- **Error Sanitization**: No sensitive data in error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `pytest`
5. Commit with clear messages
6. Push and create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Created with ❤️ for smart expense tracking

## 🙏 Acknowledgments

- FastAPI for the amazing framework
- MySQL for reliable data storage
- Modern CSS for glassmorphism inspiration

## 📞 Support

For issues and questions:

- Open an issue on GitHub
- Check the documentation in `/frontend/README.md` and `/tests/README.md`

---

**Happy expense tracking! 💰📊**
>>>>>>> 6d7a6676ef3347cbccc0f7da3070b7d2269a13d5
