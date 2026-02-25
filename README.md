<div align="center">

# 🎓 HUHEMS

### Haramaya University Holistic Exam Management System

*A modern, full-stack exam management platform built with Go and Next.js*

[![Go](https://img.shields.io/badge/Go-1.25+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://go.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Author:** [Letera Tujo](https://github.com/letera1)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Screenshots](#-screenshots)

</div>

---

## ✨ Features

### 👨‍💼 Admin Portal

<table>
<tr>
<td width="50%">

**📝 Exam Management**
- Create and configure exams with flexible settings
- Set time limits, attempt restrictions, and scheduling
- Publish/unpublish exams with validation
- Real-time monitoring and reporting

</td>
<td width="50%">

**📊 Analytics & Reports**
- Comprehensive performance insights
- Question-level difficulty analysis
- Student progress tracking
- Export detailed reports

</td>
</tr>
<tr>
<td width="50%">

**❓ Question Bank**
- Manual question creation
- Bulk CSV import support
- Single & multiple choice questions
- Rich question editor

</td>
<td width="50%">

**👥 Student Management**
- Create and manage student accounts
- Bulk CSV import for enrollment
- Department and year tracking
- Access control management

</td>
</tr>
</table>

### 🎓 Student Portal

<table>
<tr>
<td width="50%">

**📖 Exam Taking**
- Clean, distraction-free interface
- Real-time countdown timer
- Question flagging system
- Auto-save functionality

</td>
<td width="50%">

**🏆 Results & Progress**
- Instant score calculation
- Detailed answer review
- Performance history
- Progress tracking

</td>
</tr>
<tr>
<td width="50%">

**⏱️ Time Management**
- Server-side time enforcement
- Auto-submit on timeout
- Time remaining indicators
- Pause prevention

</td>
<td width="50%">

**🔒 Security Features**
- JWT authentication
- Attempt limit enforcement
- Academic integrity measures
- Secure session management

</td>
</tr>
</table>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         HUHEMS                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐              ┌──────────────┐           │
│  │   Frontend   │◄────────────►│   Backend    │           │
│  │              │              │              │           │
│  │  Next.js 16  │   REST API   │   Go + Gin   │           │
│  │  React 19    │              │   + GORM     │           │
│  │  Tailwind 4  │              │              │           │
│  └──────────────┘              └──────┬───────┘           │
│                                        │                    │
│                                        ▼                    │
│                                 ┌──────────────┐           │
│                                 │  PostgreSQL  │           │
│                                 │      16      │           │
│                                 └──────────────┘           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 📁 Project Structure

```
HUHEMS/
├── 🔧 backend/              # Go API Server
│   ├── cmd/                 # Entry points
│   │   ├── api/            # Main API server
│   │   ├── migrate/        # Database migrations
│   │   └── seed/           # Database seeding
│   ├── internal/           # Internal packages
│   │   ├── auth/           # JWT & password handling
│   │   ├── config/         # Configuration
│   │   ├── controllers/    # HTTP handlers
│   │   ├── db/             # Database connection
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Data models
│   │   └── routes/         # Route definitions
│   └── sql/                # SQL schemas
│
└── 🎨 frontend/            # Next.js Web App
    ├── app/                # App router pages
    │   ├── admin/          # Admin dashboard
    │   ├── student/        # Student portal
    │   ├── auth/           # Authentication pages
    │   └── api/            # API routes (proxy)
    ├── components/         # React components
    │   ├── ui/             # UI components
    │   └── auth/           # Auth components
    └── lib/                # Utilities
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Go** 1.21+ ([Download](https://go.dev/))
- **PostgreSQL** 16+ ([Download](https://www.postgresql.org/))
- **Docker** (optional, recommended) ([Download](https://www.docker.com/))

### 🐳 Option A: Docker Compose (Recommended)

The fastest way to get started:

```bash
# Clone the repository
git clone https://github.com/letera1/huhems-exam-system.git
cd huhems-exam-system

# Start all services
docker compose up -d --build
```

**Access the application:**
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend API: http://localhost:8080
- 🗄️ PostgreSQL: localhost:5432

### 💻 Option B: Local Development

#### 1️⃣ Start PostgreSQL

```bash
# Using Docker
docker compose up -d db

# Or use your local PostgreSQL installation
```

#### 2️⃣ Configure Backend

Create `backend/.env`:

```env
DB_URL=postgres://postgres:newpassword123@localhost:5432/huhems?sslmode=disable
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=8080
```

Run migrations and start server:

```bash
cd backend

# Install dependencies
go mod download

# Run migrations
go run ./cmd/migrate

# Start the API server
go run ./cmd/api
```

#### 3️⃣ Configure Frontend

Create `frontend/.env`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

Install and run:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**🎉 Done!** Visit http://localhost:3000

---

## 📚 Documentation

### 🔐 Default Credentials

After seeding the database, use these credentials:

**Admin Account:**
```
Username: admin
Password: admin123
```

**Student Account:**
```
Username: student
Password: student123
```

> ⚠️ **Security Note:** Change these credentials immediately in production!

### 📥 Bulk Import Features

#### 1. Questions CSV Import

**Location:** Admin → Exams → Select Exam → Import Questions

**CSV Format:**

| Column | Required | Description | Example |
|--------|----------|-------------|---------|
| `text` | ✅ | Question text | "What is the capital of France?" |
| `type` | ✅ | `single_choice` or `multi_choice` | single_choice |
| `choices` | ✅ | Pipe-separated options | "Paris\|London\|Berlin\|Madrid" |
| `correct` | ✅ | Correct answer(s) | "Paris" or "1" |

**Example CSV:**

```csv
text,type,choices,correct
"What does CPU stand for?",single_choice,"Central Processing Unit|Computer Personal Unit|Central Performance Utility|Control Processing Unit",1
"Select all prime numbers",multi_choice,"2|3|4|5|6","2|3|5"
"Which HTTP method retrieves data?",single_choice,"POST|PUT|GET|DELETE",GET
```

**Tips:**
- Use quotes for text containing commas
- Separate multiple correct answers with `|` or `,`
- Use 1-based indices or exact text for correct answers

#### 2. Students CSV Import

**Location:** Admin → Students → Import Students

**CSV Format:**

| Column | Required | Description | Example |
|--------|----------|-------------|---------|
| `username` | ✅ | Unique username | student001 |
| `email` | ✅ | Valid email address | student@university.edu |
| `password` | ✅ | Initial password (min 8 chars) | SecurePass123! |
| `fullName` | ✅ | Student's full name | John Doe |
| `year` | ✅ | Academic year (≥1) | 2 |
| `department` | ✅ | Department name | Computer Science |

**Example CSV:**

```csv
username,email,password,fullName,year,department
student001,john.doe@university.edu,Student123!,John Doe,1,Computer Science
student002,jane.smith@university.edu,Student123!,Jane Smith,2,Information Systems
student003,bob.wilson@university.edu,Student123!,Bob Wilson,3,Software Engineering
```

---

## 🎨 Screenshots

<div align="center">

### 🏠 Landing Page
*Modern, responsive design with dark/light theme support*

### 👨‍💼 Admin Dashboard
*Comprehensive exam and student management*

### 🎓 Student Portal
*Clean, distraction-free exam interface*

### 📊 Analytics
*Detailed performance insights and reports*

</div>

---

## 🛠️ Technology Stack

### Backend
- **Language:** Go 1.25+
- **Framework:** Gin (HTTP router)
- **ORM:** GORM
- **Database:** PostgreSQL 16
- **Authentication:** JWT (golang-jwt/jwt)
- **Password:** bcrypt

### Frontend
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Components:** Radix UI
- **Icons:** Lucide React
- **Language:** TypeScript 5

### DevOps
- **Containerization:** Docker & Docker Compose
- **Database:** PostgreSQL (Docker)

---

## 🔧 Configuration

### Environment Variables

#### Backend (`backend/.env`)

```env
# Database connection string
DB_URL=postgres://user:password@host:port/database?sslmode=disable

# JWT secret for token signing (change in production!)
JWT_SECRET=your-super-secret-key-min-32-characters

# Server port
PORT=8080
```

#### Frontend (`frontend/.env`)

```env
# Backend API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

# Optional: Server-side API URL (for SSR)
API_BASE_URL=http://backend:8080
```

---

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><b>❌ "Failed to fetch" during CSV import</b></summary>

**Cause:** Frontend cannot reach the backend API.

**Solution:**
1. Verify backend is running: http://localhost:8080/health
2. Check `NEXT_PUBLIC_API_BASE_URL` in `frontend/.env`
3. Restart both frontend and backend servers
</details>

<details>
<summary><b>❌ "404 page not found" on API routes</b></summary>

**Cause:** Backend routes not registered or server not restarted.

**Solution:**
1. Restart the backend server
2. Check route definitions in `backend/internal/routes/routes.go`
3. Verify the API endpoint exists
</details>

<details>
<summary><b>❌ Database connection failed</b></summary>

**Cause:** PostgreSQL not running or incorrect credentials.

**Solution:**
1. Ensure PostgreSQL is running: `docker compose ps`
2. Verify `DB_URL` in `backend/.env`
3. Check PostgreSQL logs: `docker compose logs db`
</details>

<details>
<summary><b>❌ "Port already in use"</b></summary>

**Cause:** Another process is using the port.

**Solution:**
```bash
# Find process using port 3000 (frontend)
lsof -i :3000
# or
netstat -ano | findstr :3000

# Find process using port 8080 (backend)
lsof -i :8080
# or
netstat -ano | findstr :8080

# Kill the process or change the port in .env
```
</details>

---

## 🧪 Testing

### Run Backend Tests

```bash
cd backend
go test ./...
```

### Run Frontend Tests

```bash
cd frontend
npm test
```

---

## 📦 Deployment

### Production Checklist

- [ ] Change `JWT_SECRET` to a strong, random value
- [ ] Update default admin/student passwords
- [ ] Enable HTTPS/TLS
- [ ] Set secure cookie flags
- [ ] Configure CORS properly
- [ ] Set up database backups
- [ ] Configure environment-specific variables
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging
- [ ] Review security headers

### Docker Production Build

```bash
# Build production images
docker compose -f docker-compose.prod.yml build

# Start production services
docker compose -f docker-compose.prod.yml up -d
```

---

## 🤝 Contributing

We love contributions! Whether it's bug fixes, new features, or documentation improvements, your help makes HUHEMS better for everyone.

### Quick Start

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. ✍️ Make your changes
4. ✅ Write/update tests
5. 📝 Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. 🚀 Push to the branch (`git push origin feature/amazing-feature`)
7. 🎉 Open a Pull Request

### 📖 Detailed Guidelines

Please read our [Contributing Guide](CONTRIBUTING.md) for:
- Code of Conduct
- Development setup
- Coding standards
- Commit message conventions
- Pull request process
- Testing guidelines

### 🐛 Found a Bug?

- Check [existing issues](https://github.com/letera1/huhems-exam-system/issues) first
- Open a new issue with detailed information
- Include steps to reproduce
- Add screenshots if applicable

### 💡 Have an Idea?

- Open a [GitHub Discussion](https://github.com/letera1/huhems-exam-system/discussions)
- Describe your feature proposal
- Explain the use case
- Get feedback from maintainers

### 🔒 Security Issues?

Please review our [Security Policy](SECURITY.md) for reporting vulnerabilities.

---

## 📄 License

This project is licensed under the **MIT License** with additional terms - see the [LICENSE](LICENSE) file for complete details.

### 📋 License Summary

```
MIT License - Copyright (c) 2025-2026 Letera Tujo
```

**You are free to:**
- ✅ Use commercially
- ✅ Modify and distribute
- ✅ Use privately
- ✅ Sublicense

**Under the conditions:**
- 📝 Include copyright notice
- 📝 Include license text
- 📝 Provide attribution

**Limitations:**
- ❌ No warranty provided
- ❌ No liability accepted
- ⚠️ Security is user's responsibility

### 🔐 Important Security Notes

Before deploying to production:
- Change all default credentials
- Update `JWT_SECRET` to a strong random value
- Enable HTTPS/TLS
- Implement rate limiting
- Set up proper CORS policies
- Follow security best practices
- Conduct security audits

### 🎓 Educational Use

This software was developed for **Haramaya University** and is intended for educational and institutional use. Commercial use is permitted under the MIT License terms.

### 📦 Third-Party Licenses

This project includes open source components with their own licenses:

**Backend Dependencies:**
- Go (BSD-3-Clause)
- Gin Web Framework (MIT)
- GORM (MIT)
- JWT-Go (MIT)

**Frontend Dependencies:**
- Next.js (MIT)
- React (MIT)
- Tailwind CSS (MIT)
- Radix UI (MIT)

See [LICENSE](LICENSE) for complete third-party license information.

---

## 🙏 Acknowledgments

- Haramaya University for project support
- Open source community for amazing tools
- Contributors and testers

---

## 📞 Support & Community

### 💬 Get Help

- 📖 **Documentation:** [Wiki](https://github.com/letera1/huhems-exam-system/wiki)
- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/letera1/huhems-exam-system/issues)
- 💡 **Feature Requests:** [GitHub Discussions](https://github.com/letera1/huhems-exam-system/discussions)
- 📧 **Email:** [letera.tujo@example.com](mailto:letera.tujo@example.com)

### 📚 Resources

- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Security Policy](SECURITY.md) - Security guidelines
- [License](LICENSE) - MIT License with additional terms
- [Changelog](CHANGELOG.md) - Version history

---

<div align="center">

**Made by [Letera Tujo](https://github.com/letera1)**

⭐ Star this repository if you find it helpful!

</div>
