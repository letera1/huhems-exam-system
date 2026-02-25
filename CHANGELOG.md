# Changelog

All notable changes to HUHEMS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned Features
- Multi-language support (i18n)
- Question randomization
- Essay-type questions
- Exam templates
- Advanced analytics dashboard
- Mobile app (React Native)
- Email notifications
- Exam scheduling calendar
- Question bank management
- Plagiarism detection

---

## [1.0.0] - 2026-02-25

### 🎉 Initial Release

The first stable release of HUHEMS - Haramaya University Holistic Exam Management System.

### ✨ Added

#### Admin Features
- **Exam Management**
  - Create, edit, and delete exams
  - Configure exam settings (duration, attempts, scheduling)
  - Publish/unpublish exams with validation
  - Preview exams before publishing
  - Exam reports and analytics

- **Question Management**
  - Create single-choice and multiple-choice questions
  - Bulk import questions via CSV
  - Edit and delete questions
  - Question validation

- **Student Management**
  - Create, edit, and delete student accounts
  - Bulk import students via CSV
  - View student profiles
  - Track student enrollment

- **Analytics & Reports**
  - Exam-level performance statistics
  - Question difficulty analysis
  - Student performance tracking
  - Export reports

#### Student Features
- **Exam Taking**
  - View available published exams
  - Start exam attempts with rules confirmation
  - Real-time countdown timer
  - Question navigation (previous/next)
  - Flag questions for review
  - Auto-save answers
  - Submit exams manually or auto-submit on timeout

- **Results & History**
  - View exam results immediately after submission
  - See correct/incorrect answers
  - Review flagged questions
  - Track attempt history
  - View scores and performance

#### Authentication & Security
- JWT-based authentication
- Role-based access control (Admin/Student)
- Password hashing with bcrypt
- Secure session management
- First-login password change requirement
- HTTP-only cookies

#### UI/UX
- Modern, responsive design
- Dark/light theme support
- Smooth animations and transitions
- Gradient color schemes
- Mobile-friendly interface
- Accessible components (Radix UI)

#### Technical Features
- RESTful API architecture
- PostgreSQL database with GORM
- Server-side rendering with Next.js
- Type-safe TypeScript frontend
- Docker containerization
- Database migrations
- Comprehensive error handling

### 🔧 Technical Stack

#### Backend
- Go 1.25+
- Gin Web Framework
- GORM (PostgreSQL ORM)
- JWT authentication
- bcrypt password hashing

#### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Radix UI components
- Lucide React icons

#### Database
- PostgreSQL 16

#### DevOps
- Docker & Docker Compose
- Environment-based configuration

### 📝 Documentation
- Comprehensive README with setup instructions
- API documentation
- CSV import format guides
- Troubleshooting guide
- Security best practices
- Contributing guidelines
- MIT License with additional terms

### 🔒 Security
- Secure default configuration
- Input validation and sanitization
- SQL injection protection (via GORM)
- XSS protection (via React)
- CSRF considerations documented
- Security policy and guidelines

---

## Version History

### Version Numbering

We use [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality (backwards-compatible)
- **PATCH** version for backwards-compatible bug fixes

### Release Types

- 🎉 **Major Release** - Significant new features or breaking changes
- ✨ **Minor Release** - New features, backwards-compatible
- 🐛 **Patch Release** - Bug fixes and minor improvements
- 🔒 **Security Release** - Security fixes (may be out of sequence)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Reporting bugs
- Suggesting features
- Submitting pull requests
- Development workflow

---

## Support

- 📖 [Documentation](https://github.com/letera1/huhems-exam-system/wiki)
- 🐛 [Issue Tracker](https://github.com/letera1/huhems-exam-system/issues)
- 💬 [Discussions](https://github.com/letera1/huhems-exam-system/discussions)

---

**Note:** This changelog is maintained by the HUHEMS development team. For detailed commit history, see the [GitHub repository](https://github.com/letera1/huhems-exam-system).

[Unreleased]: https://github.com/letera1/huhems-exam-system/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/letera1/huhems-exam-system/releases/tag/v1.0.0
