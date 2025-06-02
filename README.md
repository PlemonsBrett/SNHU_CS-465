# SNHU_CS-465 Full Stack Web Development

A full-stack web application built with Express.js and Handlebars following the MVC (Model-View-Controller) architectural pattern for the SNHU CS-465 course.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Available Scripts](#available-scripts)
- [Module Progress](#module-progress)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project demonstrates progressive full-stack web development concepts through course module assignments:

- **Backend**: Node.js with Express.js
- **Architecture**: MVC (Model-View-Controller) pattern
- **View Engine**: Handlebars for server-side templating
- **Data**: JSON-based data storage
- **Styling**: Static CSS with responsive design

## Project Structure

```txt
SNHU_CS-465/
├── app.js                   # Main application entry point
├── package.json             # Dependencies and scripts
├── app_server/              # MVC application structure
│   ├── controllers/         # Route controllers
│   │   └── travel.js        # Travel page controller
│   ├── routes/              # Route definitions
│   │   └── index.js         # Main router
│   └── views/               # Handlebars templates
│       ├── layouts/         # Layout templates
│       │   └── main.hbs     # Main page layout
│       ├── partials/        # Reusable template parts
│       │   ├── header.hbs   # Site header
│       │   └── footer.hbs   # Site footer
│       ├── index.hbs        # Home page template
│       ├── travel.hbs       # Travel page template
│       └── error.hbs        # Error page template
├── data/                    # JSON data files
│   └── trips.json          # Travel trip data
├── public/                  # Static assets
│   ├── css/                # Stylesheets
│   │   └── style.css       # Main stylesheet
│   └── images/             # Image assets
├── journals/                # Course reflection journals
│   ├── ModuleOne.md        # Module 1 journal entry
│   └── ModuleThree.md      # Module 3 journal entry
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/plemonsBrett/SNHU_CS-465.git
   cd SNHU_CS-465
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start the Express server
- `npm run dev` - Start with auto-reload using nodemon

### Testing the Application

- **Home Page**: `http://localhost:3000` - Static home page with layout and navigation
- **Travel Page**: `http://localhost:3000/travel` - Dynamic page showing trip data from JSON with Handlebars loops
- **Navigation**: Active page highlighting in both header and footer navigation
- **Error Handling**: Try visiting a non-existent route to see custom error page

## Module Progress

- ✅ **Module 1**: Basic Express setup with static HTML files
- ✅ **Module 2**: MVC architecture with Handlebars templating and JSON data
- ✅ **Module 3**: Enhanced templating with dynamic JSON data rendering
- ⏳ **Module 4**: Database integration and data persistence
- ⏳ **Future Modules**: REST API development, authentication, admin functionality

### Key Features Implemented

**Module 1:**

- Express.js server setup
- Static file serving
- Basic routing
- HTML template structure

**Module 2:**

- MVC architectural pattern implementation
- Handlebars templating engine integration
- Basic dynamic content rendering
- Separation of concerns (routes, controllers, views)
- Reusable template partials (header/footer)
- Error handling and custom error pages

**Module 3:**
- Advanced Handlebars templating with loops (`{{#each}}`)
- Dynamic JSON data integration from external files
- Enhanced trip data structure with detailed information
- Conditional navigation highlighting
- Improved user experience with consistent data presentation
- Template-based content management system

**Upcoming Features:**

- Database integration (MongoDB)
- REST API development
- User authentication
- Admin panel functionality
- CRUD operations for trip management

## File Organization

### MVC Architecture

- **Models**: Data structures and business logic (JSON files in `/data`)
- **Views**: Handlebars templates in `/app_server/views`
- **Controllers**: Request handlers in `/app_server/controllers`
- **Routes**: URL routing definitions in `/app_server/routes`

### Template Structure

- **Layout**: `main.hbs` provides the base HTML structure with header and footer partials
- **Partials**: Reusable components like header and footer with conditional navigation highlighting
- **Views**: Individual page templates that extend the layout and use dynamic data
- **Data Integration**: JSON files provide content that's dynamically rendered through Handlebars loops

## Contributing

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our development process and how to submit contributions.

## License

This project is licensed under the Unlicense - see the [LICENSE](LICENSE) file for details.
