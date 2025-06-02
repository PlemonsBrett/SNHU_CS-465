# Contributing to SNHU_CS-465

Thank you for your interest in contributing to this project! This document provides guidelines for contributing to the SNHU_CS-465 full-stack web application.

## Development Environment Setup

### Prerequisites

- **Node.js**: Version 18 or newer
- **npm**: Comes bundled with Node.js

### Initial Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/SNHU_CS-465.git`
3. Navigate to the project: `cd SNHU_CS-465`
4. Install dependencies: `npm install`

## Development Workflow

### Branch Strategy

We follow a simple branching model for course modules:

- `main`: Production-ready code
- `module1`: Module 1 assignment work
- `module2`: Module 2 assignment work
- `module3`: Module 3 assignment work (and so on)

#### Working on a new module

```bash
git checkout main
git pull origin main
git checkout -b module3  # or appropriate module number
# Make your changes
git add .
git commit -m "Complete Module 3 assignment requirements"
git push origin module3
```

### Commit Guidelines

Use clear, descriptive commit messages that explain what was accomplished:

- `feat: add JSON data integration to travel page`
- `fix: resolve handlebars template rendering issue`
- `docs: update README with Module 2 progress`
- `refactor: reorganize MVC folder structure`

### Code Style

- Use consistent indentation (2 spaces)
- Follow JavaScript naming conventions (camelCase for variables, PascalCase for constructors)
- Keep functions small and focused
- Add comments for complex logic
- Use meaningful variable and function names

### File Organization

Follow the established MVC pattern:

```txt
app_server/
├── controllers/     # Business logic and request handling
├── routes/          # URL routing definitions  
└── views/           # Handlebars templates
    ├── layouts/     # Base templates
    ├── partials/    # Reusable components
    └── *.hbs        # Individual page templates
```

### Testing Your Changes

Before committing:

1. Start the server: `npm start`
2. Test all routes manually:
   - Home page: `http://localhost:3000`
   - Travel page: `http://localhost:3000/travel`
   - Error handling: Try visiting a non-existent route
3. Verify static assets load correctly (CSS, images)
4. Check that data displays properly from JSON files

## Module-Specific Guidelines

### Module 1
- Focus on basic Express setup
- Static file serving
- Basic HTML structure

### Module 2  
- Implement MVC architecture
- Add Handlebars templating
- Create JSON data integration
- Separate concerns properly

### Module 3+
- Follow assignment requirements
- Build incrementally on previous work
- Maintain backward compatibility

## Pull Request Process

1. Ensure your code follows the style guidelines
2. Test your changes thoroughly
3. Update documentation if necessary
4. Create a pull request with a clear description of changes
5. Reference any assignment requirements addressed

## Questions and Support

If you have questions about:
- **Course assignments**: Refer to the module guidelines and rubrics
- **Technical issues**: Check the README.md troubleshooting section
- **Code structure**: Follow the established MVC patterns in the project

## Academic Integrity

This project is for educational purposes. When contributing:
- Ensure your work is original
- Properly cite any external resources or tutorials used
- Follow SNHU's academic integrity policies
- Don't share assignment solutions publicly before due dates

Thank you for contributing!