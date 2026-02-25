# Contributing to HUHEMS

First off, thank you for considering contributing to HUHEMS! 🎉

It's people like you that make HUHEMS such a great tool for educational institutions.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**When submitting a bug report, include:**
- Clear, descriptive title
- Detailed steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, versions)
- Error messages or logs

**Use this template:**

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g. Windows 11]
 - Browser: [e.g. Chrome 120]
 - Version: [e.g. 1.0.0]

**Additional context**
Any other context about the problem.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues.

**When suggesting an enhancement, include:**
- Clear, descriptive title
- Detailed description of the proposed feature
- Explain why this enhancement would be useful
- List any alternatives you've considered
- Mockups or examples (if applicable)

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Simple issues for beginners
- `help wanted` - Issues that need assistance
- `documentation` - Documentation improvements

### Pull Requests

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Update documentation
6. Submit a pull request

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- Go 1.21+
- PostgreSQL 16+
- Docker (optional)
- Git

### Setup Steps

1. **Fork and Clone**
```bash
git clone https://github.com/YOUR_USERNAME/huhems-exam-system.git
cd huhems-exam-system
```

2. **Backend Setup**
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
go mod download
go run ./cmd/migrate
go run ./cmd/api
```

3. **Frontend Setup**
```bash
cd frontend
cp .env.example .env
# Edit .env with your configuration
npm install
npm run dev
```

4. **Database Setup**
```bash
docker compose up -d db
```

## 📝 Coding Standards

### Go (Backend)

**Follow these conventions:**

```go
// ✅ Good
func CreateExam(db *gorm.DB) gin.HandlerFunc {
    return func(c *gin.Context) {
        var req createExamRequest
        if err := c.ShouldBindJSON(&req); err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"message": "invalid request"})
            return
        }
        // ... rest of the code
    }
}

// ❌ Bad
func createexam(db *gorm.DB) gin.HandlerFunc {
    return func(c *gin.Context) {
        var req createExamRequest
        c.BindJSON(&req) // No error handling
        // ... rest of the code
    }
}
```

**Best Practices:**
- Use meaningful variable names
- Add comments for complex logic
- Handle all errors explicitly
- Use `gofmt` for formatting
- Follow [Effective Go](https://golang.org/doc/effective_go)
- Keep functions small and focused
- Use dependency injection

**Run linters:**
```bash
go fmt ./...
go vet ./...
golangci-lint run
```

### TypeScript/React (Frontend)

**Follow these conventions:**

```typescript
// ✅ Good
interface ExamListItem {
  id: string;
  title: string;
  description: string;
}

export function ExamCard({ exam }: { exam: ExamListItem }) {
  const [loading, setLoading] = useState(false);
  
  const handleStart = async () => {
    setLoading(true);
    try {
      await startExam(exam.id);
    } catch (error) {
      console.error('Failed to start exam:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardTitle>{exam.title}</CardTitle>
      <Button onClick={handleStart} disabled={loading}>
        {loading ? 'Starting...' : 'Start Exam'}
      </Button>
    </Card>
  );
}

// ❌ Bad
export function ExamCard(props: any) {
  const [loading, setLoading] = useState(false);
  
  const handleStart = () => {
    setLoading(true);
    startExam(props.exam.id); // No error handling
    setLoading(false); // Wrong - should be in finally
  };

  return (
    <div>
      <h1>{props.exam.title}</h1>
      <button onClick={handleStart}>Start</button>
    </div>
  );
}
```

**Best Practices:**
- Use TypeScript for type safety
- Use functional components with hooks
- Implement proper error handling
- Use meaningful component names
- Keep components small and focused
- Use proper prop types
- Follow React best practices
- Use Tailwind CSS for styling

**Run linters:**
```bash
npm run lint
npm run type-check
```

### Database

**Migration Guidelines:**
- Always create reversible migrations
- Test migrations on a copy of production data
- Never modify existing migrations
- Use descriptive migration names
- Add indexes for frequently queried columns

## 💬 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```bash
# Good commits
feat(admin): add bulk student import functionality
fix(auth): resolve JWT token expiration issue
docs(readme): update installation instructions
refactor(api): simplify exam creation logic
test(student): add unit tests for exam submission

# Bad commits
update stuff
fix bug
changes
WIP
```

### Commit Message Rules

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests when relevant
- Provide detailed description in body if needed

## 🔄 Pull Request Process

### Before Submitting

1. **Update your fork**
```bash
git remote add upstream https://github.com/letera1/huhems-exam-system.git
git fetch upstream
git rebase upstream/main
```

2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**
- Write clean, documented code
- Follow coding standards
- Add/update tests
- Update documentation

4. **Test your changes**
```bash
# Backend
cd backend
go test ./...

# Frontend
cd frontend
npm test
npm run build
```

5. **Commit your changes**
```bash
git add .
git commit -m "feat(scope): add amazing feature"
```

6. **Push to your fork**
```bash
git push origin feature/amazing-feature
```

### Submitting the PR

1. Go to the original repository
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template
5. Link related issues
6. Request review

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Closes #123
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be credited

## 🧪 Testing Guidelines

### Backend Tests

```go
func TestCreateExam(t *testing.T) {
    // Setup
    db := setupTestDB(t)
    defer teardownTestDB(t, db)
    
    // Test
    exam := models.Exam{
        Title: "Test Exam",
        Description: "Test Description",
    }
    
    err := db.Create(&exam).Error
    
    // Assert
    assert.NoError(t, err)
    assert.NotEmpty(t, exam.ID)
}
```

### Frontend Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ExamCard } from './ExamCard';

describe('ExamCard', () => {
  it('renders exam title', () => {
    const exam = {
      id: '1',
      title: 'Test Exam',
      description: 'Test Description',
    };
    
    render(<ExamCard exam={exam} />);
    
    expect(screen.getByText('Test Exam')).toBeInTheDocument();
  });
  
  it('handles start button click', async () => {
    const exam = { id: '1', title: 'Test Exam' };
    const onStart = jest.fn();
    
    render(<ExamCard exam={exam} onStart={onStart} />);
    
    fireEvent.click(screen.getByText('Start Exam'));
    
    expect(onStart).toHaveBeenCalledWith('1');
  });
});
```

## 📚 Documentation

When adding features, update:
- README.md
- API documentation
- Code comments
- User guides
- Migration guides (if breaking changes)

## 🎯 Areas for Contribution

We especially welcome contributions in:

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🧪 Test coverage
- 🎨 UI/UX enhancements
- ♿ Accessibility improvements
- 🌍 Internationalization
- 🔒 Security enhancements
- ⚡ Performance optimizations

## 💡 Questions?

- Open a [GitHub Discussion](https://github.com/letera1/huhems-exam-system/discussions)
- Join our community chat
- Email: letera.tujo@example.com

## 🙏 Thank You!

Your contributions make HUHEMS better for everyone. We appreciate your time and effort!

---

**Happy Coding! 🚀**
