# Security Policy

## 🔒 Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## 🚨 Reporting a Vulnerability

We take the security of HUHEMS seriously. If you discover a security vulnerability, please follow these steps:

### 1. **DO NOT** Open a Public Issue

Please do not report security vulnerabilities through public GitHub issues.

### 2. Report Privately

Send a detailed report to: **[letera.tujo@example.com](mailto:letera.tujo@example.com)**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### 3. Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Depends on severity
  - Critical: 1-7 days
  - High: 7-14 days
  - Medium: 14-30 days
  - Low: 30-90 days

## 🛡️ Security Best Practices

### Before Production Deployment

#### 1. Authentication & Authorization
- [ ] Change default admin credentials (`admin/admin123`)
- [ ] Change default student credentials (`student/student123`)
- [ ] Generate a strong `JWT_SECRET` (minimum 32 characters)
- [ ] Implement password complexity requirements
- [ ] Enable account lockout after failed attempts
- [ ] Implement session timeout

#### 2. Database Security
- [ ] Use strong database passwords
- [ ] Restrict database access to application only
- [ ] Enable SSL/TLS for database connections
- [ ] Regular database backups
- [ ] Encrypt sensitive data at rest
- [ ] Use prepared statements (already implemented via GORM)

#### 3. Network Security
- [ ] Enable HTTPS/TLS for all connections
- [ ] Configure proper CORS policies
- [ ] Implement rate limiting
- [ ] Use a Web Application Firewall (WAF)
- [ ] Restrict API access by IP if possible
- [ ] Enable security headers (CSP, HSTS, etc.)

#### 4. Application Security
- [ ] Keep all dependencies up to date
- [ ] Run security audits regularly
- [ ] Implement input validation
- [ ] Sanitize user inputs
- [ ] Enable audit logging
- [ ] Monitor for suspicious activities

#### 5. Data Privacy
- [ ] Comply with GDPR/FERPA regulations
- [ ] Implement data retention policies
- [ ] Provide data export functionality
- [ ] Enable data deletion on request
- [ ] Encrypt personal information
- [ ] Document data handling procedures

### Environment Variables Security

**Never commit these to version control:**

```env
# ❌ BAD - Don't use in production
JWT_SECRET=yourstrongsecret
DB_URL=postgres://postgres:password@localhost:5432/huhems

# ✅ GOOD - Use strong, random values
JWT_SECRET=8f3a9b2c7d1e6f4a5b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0
DB_URL=postgres://huhems_user:Str0ng_R@nd0m_P@ssw0rd!@db.internal:5432/huhems_prod?sslmode=require
```

### Security Headers

Implement these security headers in production:

```nginx
# Nginx example
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

## 🔍 Known Security Considerations

### 1. Default Credentials
The application ships with default credentials for testing. **These MUST be changed before production deployment.**

### 2. JWT Token Storage
Tokens are stored in HTTP-only cookies. Ensure:
- Cookies are marked as `Secure` in production
- `SameSite` attribute is properly configured
- Token expiration is reasonable (currently 24 hours)

### 3. File Uploads
CSV import functionality accepts file uploads. Ensure:
- File size limits are enforced
- File type validation is strict
- Uploaded files are scanned for malware
- Temporary files are cleaned up

### 4. SQL Injection
GORM uses prepared statements by default, providing protection against SQL injection. However:
- Always validate user inputs
- Never construct raw SQL queries with user input
- Use GORM's query builder methods

### 5. Cross-Site Scripting (XSS)
React provides XSS protection by default. However:
- Never use `dangerouslySetInnerHTML` with user input
- Sanitize any HTML content from users
- Validate and escape all user inputs

### 6. Cross-Site Request Forgery (CSRF)
- Implement CSRF tokens for state-changing operations
- Use SameSite cookie attribute
- Validate Origin/Referer headers

## 🔐 Security Checklist

Use this checklist before going to production:

### Infrastructure
- [ ] HTTPS enabled with valid SSL certificate
- [ ] Firewall configured
- [ ] Database not publicly accessible
- [ ] Regular security updates scheduled
- [ ] Backup system in place
- [ ] Monitoring and alerting configured

### Application
- [ ] All default credentials changed
- [ ] Strong JWT secret configured
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] Error messages don't leak sensitive info
- [ ] Logging configured (without sensitive data)

### Compliance
- [ ] Privacy policy created
- [ ] Terms of service defined
- [ ] Data retention policy documented
- [ ] GDPR/FERPA compliance verified
- [ ] Security audit completed
- [ ] Penetration testing performed

## 📚 Security Resources

### Tools
- [OWASP ZAP](https://www.zaproxy.org/) - Security testing
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Frontend dependency scanning
- [gosec](https://github.com/securego/gosec) - Go security checker
- [Snyk](https://snyk.io/) - Dependency vulnerability scanning

### Guidelines
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [Go Security Best Practices](https://github.com/OWASP/Go-SCP)
- [React Security Best Practices](https://snyk.io/blog/10-react-security-best-practices/)

## 🤝 Security Acknowledgments

We appreciate security researchers who responsibly disclose vulnerabilities. Contributors will be acknowledged in our security advisories (with permission).

## 📞 Contact

For security concerns, contact:
- **Email:** letera.tujo@example.com
- **GitHub:** [@letera1](https://github.com/letera1)

---

**Last Updated:** February 2026
