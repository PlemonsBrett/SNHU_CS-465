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
- **Database**: MongoDB with Mongoose ODM
- **Architecture**: MVC (Model-View-Controller) pattern
- **View Engine**: Handlebars for server-side templating
- **Data Storage**: MongoDB for persistent data management with schema validation
- **Package Management**: pnpm for efficient dependency management
- **Code Quality**: Biome for linting and formatting
- **Styling**: Static CSS with responsive design

## Project Structure

```txt
SNHU_CS-465/
├── app.js                   # Main application entry point
├── package.json             # Dependencies and scripts
├── app_server/              # MVC application structure
│   ├── controllers/         # Route controllers
│   │   └── travel.js        # Travel page controller
│   ├── models/              # Database models and connection
│   │   ├── db.js           # MongoDB connection configuration
│   │   ├── travlr.js       # Trip data model and Mongoose schema
│   │   └── seed.js         # Database seeding script
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
│   ├── ModuleThree.md      # Module 3 journal entry
│   └── ModuleFour.md       # Module 4 journal entry
├── .env                     # Environment variables (not in git)
├── .env.example            # Environment variables template
├── biome.json              # Biome configuration for linting and formatting
├── pnpm-lock.yaml          # pnpm lockfile for dependency versions
├── pnpm-workspace.yaml     # pnpm workspace configuration
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- pnpm package manager (recommended) or npm
- MongoDB (local installation or MongoDB Atlas cloud database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/plemonsBrett/SNHU_CS-465.git
   cd SNHU_CS-465
   ```

2. Install dependencies:

   ```bash
   pnpm install
   # or
   npm install
   ```

3. Set up environment variables:

   ```bash
   # Copy the example environment file and configure your database settings
   cp .env.example .env
   # Edit .env with your MongoDB connection details
   ```

4. Seed the database with sample data:

   ```bash
   pnpm run seed
   # or
   npm run seed
   ```

5. Start the application:

   ```bash
   pnpm start
   # or
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start the Express server
- `npm run dev` - Start with auto-reload using nodemon
- `npm run seed` - Populate MongoDB with sample trip data
- `npm run lint` - Check code formatting and style with Biome
- `npm run lint:fix` - Automatically fix code formatting issues

### Testing the Application

- **Home Page**: `http://localhost:3000` - Static home page with layout and navigation
- **Travel Page**: `http://localhost:3000/travel` - Dynamic page showing trip data from MongoDB with images
- **Navigation**: Active page highlighting in both header and footer navigation
- **Error Handling**: Try visiting a non-existent route to see custom error page
- **Database**: Use MongoDB Compass to inspect the `travlr` database and `trips` collection

## Database Configuration

### Environment Variables

The application uses environment variables for database configuration. Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Configuration
DB_HOST=127.0.0.1
DB_PORT=27017
DB_USER=adminUser
DB_PASSWORD=adminPassword
DB_AUTH_SOURCE=admin
DB_NAME=travlr

# Application Configuration
PORT=3000
NODE_ENV=development
```

### MongoDB Setup

**Local MongoDB Installation:**

1. Install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start the MongoDB service
3. Create a database user with appropriate permissions
4. Update the `.env` file with your credentials

**MongoDB Atlas (Cloud):**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Set up database access credentials
4. Update the connection string in your `.env` file

### Database Schema

The application uses Mongoose schemas for data validation and structure:

```javascript
// Trip Schema (app_server/models/travlr.js)
const tripSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true, index: true },
  length: { type: String, required: true },
  start: { type: Date, required: true },
  resort: { type: String, required: true },
  perPerson: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
});
```

## Dependencies

### Production Dependencies

- **express**: Web application framework for Node.js
- **express-handlebars**: Handlebars view engine for Express
- **mongoose**: MongoDB object modeling for Node.js
- **dotenv**: Environment variable loader
- **cookie-parser**: Cookie parsing middleware
- **morgan**: HTTP request logger middleware
- **http-errors**: HTTP error handling utility
- **debug**: Debugging utility

### Development Dependencies

- **nodemon**: Development server with auto-restart
- **biome**: Fast formatter and linter for JavaScript/TypeScript

### Key Changes in Module 4

- **Added MongoDB Integration**: `mongoose` for database operations and schema management
- **Environment Configuration**: `dotenv` for secure credential management
- **Code Quality Tools**: `biome` for consistent code formatting and linting
- **Package Management**: Migrated to `pnpm` for faster, more efficient dependency management

## Module Progress

- ✅ **Module 1**: Basic Express setup with static HTML files
- ✅ **Module 2**: MVC architecture with Handlebars templating and JSON data
- ✅ **Module 3**: Enhanced templating with dynamic JSON data rendering
- ✅ **Module 4**: MongoDB integration with Mongoose ODM and database persistence
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

**Module 4:**

- MongoDB database integration with Mongoose ODM
- Database connection management with graceful shutdown handling
- Mongoose schema definition with validation and indexing
- Database seeding scripts for development data population
- Asynchronous database operations with proper error handling
- Environment-based configuration for database credentials
- Migration from static JSON files to persistent database storage

**Upcoming Features:**

- Database integration (MongoDB)
- REST API development
- User authentication
- Admin panel functionality
- CRUD operations for trip management

## File Organization

### MVC Architecture

- **Models**: Data structures and business logic using Mongoose schemas (`/app_server/models`)
- **Views**: Handlebars templates in `/app_server/views`
- **Controllers**: Request handlers in `/app_server/controllers`
- **Routes**: URL routing definitions in `/app_server/routes`

### Template Structure

- **Layout**: `main.hbs` provides the base HTML structure with header and footer partials
- **Partials**: Reusable components like header and footer with conditional navigation highlighting
- **Views**: Individual page templates that extend the layout and use dynamic data
- **Data Integration**: MongoDB provides persistent data storage with Mongoose ODM for data modeling

### Database Architecture

- **MongoDB**: NoSQL document database for flexible data storage
- **Mongoose**: ODM (Object Document Mapper) for schema definition and validation
- **Schema**: Trip model with validation, indexing, and proper data types
- **Seeding**: Automated scripts to populate development data
- **Environment Config**: Secure credential management with `.env` files

## Contributing

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our development process and how to submit contributions.

## License

This project is licensed under the Unlicense - see the [LICENSE](LICENSE) file for details.
