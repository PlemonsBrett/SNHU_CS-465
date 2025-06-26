# SNHU_CS-465 Full Stack Web Development

A full-stack web application built with Express.js and Handlebars following the MVC (Model-View-Controller) architectural pattern with RESTful API architecture and JWT-based authentication for the SNHU CS-465 course.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
  - [Trip Endpoints](#trip-endpoints)
  - [Authentication Endpoints](#authentication-endpoints)
- [Authentication](#authentication)
- [Module Progress](#module-progress)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project demonstrates progressive full-stack web development concepts through course module assignments:

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Architecture**: RESTful API with separation of concerns (API layer + Web application layer + SPA admin interface)
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **View Engine**: Handlebars for server-side templating (customer-facing) + Angular for SPA (admin interface)
- **Frontend**: Angular 20 Single Page Application for administrative functionality
- **Data Storage**: MongoDB for persistent data management with schema validation
- **Package Management**: pnpm for efficient dependency management with workspace support
- **Code Quality**: Biome for linting and formatting
- **Styling**: Static CSS with responsive design + Bootstrap 5 for Angular SPA

## Project Structure

```txt
SNHU_CS-465/
├── app.js                   # Main application entry point
├── package.json             # Dependencies and scripts
├── app_api/                 # RESTful API layer
│   ├── config/              # Configuration files
│   │   └── passport.js      # Passport.js configuration
│   ├── controllers/         # API controllers
│   │   ├── authentication.js # User authentication controller
│   │   └── trips.js         # Trip CRUD API endpoints controller
│   ├── models/              # Database models and connection
│   │   ├── db.js           # MongoDB connection configuration
│   │   ├── travlr.js       # Trip data model and Mongoose schema
│   │   ├── user.js         # User model and authentication schema
│   │   └── seed.js         # Database seeding script
│   └── routes/              # API route definitions
│       └── index.js         # API router with full CRUD support
├── app_server/              # Web application layer (customer-facing)
│   ├── controllers/         # Web page controllers
│   │   └── travel.js        # Travel page controller (consumes API)
│   ├── routes/              # Web route definitions
│   │   └── index.js         # Web router
│   └── views/               # Handlebars templates
│       ├── layouts/         # Layout templates
│       │   └── main.hbs     # Main page layout
│       ├── partials/        # Reusable template parts
│       │   ├── header.hbs   # Site header
│       │   └── footer.hbs   # Site footer
│       ├── index.hbs        # Home page template
│       ├── travel.hbs       # Travel page template
│       └── error.hbs        # Error page template
├── app_admin/               # Angular SPA administrative interface
│   ├── src/                 # Angular source code
│   │   ├── app/             # Angular application
│   │   │   ├── components/  # Angular components
│   │   │   │   ├── add-trip/      # Add trip form component
│   │   │   │   ├── edit-trip/     # Edit trip form component
│   │   │   │   ├── login/         # User login component
│   │   │   │   ├── navbar/        # Navigation component
│   │   │   │   ├── trip-card/     # Trip display card component
│   │   │   │   └── trip-listing/  # Trip listing component
│   │   │   ├── models/      # TypeScript interfaces
│   │   │   │   ├── auth-response.ts # Authentication response interface
│   │   │   │   ├── trip.ts  # Trip model interface
│   │   │   │   └── user.ts  # User model interface
│   │   │   ├── services/    # Angular services
│   │   │   │   ├── authentication.service.ts # Authentication service
│   │   │   │   └── trip-data.service.ts # API integration service
│   │   │   ├── utils/       # Utility files
│   │   │   │   └── jwt.interceptor.ts # JWT token interceptor
│   │   │   ├── app.component.ts    # Root component
│   │   │   ├── app.config.ts       # App configuration
│   │   │   ├── app.routes.ts       # SPA routing
│   │   │   └── storage.ts          # Local storage utilities
│   │   ├── assets/          # Static assets for Angular
│   │   ├── styles.css       # Global Angular styles
│   │   └── index.html       # Angular app entry point
│   ├── angular.json         # Angular CLI configuration
│   ├── package.json         # Angular dependencies
│   └── tsconfig.json        # TypeScript configuration
├── data/                    # JSON data files (legacy)
│   └── trips.json          # Travel trip data
├── public/                  # Static assets (Express server)
│   ├── css/                # Stylesheets
│   │   └── style.css       # Main stylesheet
│   └── images/             # Image assets
├── journals/                # Course reflection journals
│   ├── ModuleOne.md        # Module 1 journal entry
│   ├── ModuleThree.md      # Module 3 journal entry
│   ├── ModuleFour.md       # Module 4 journal entry
│   ├── ModuleFive.md       # Module 5 journal entry
│   ├── ModuleSix.md        # Module 6 journal entry
│   └── ModuleSeven.md      # Module 7 journal entry
├── .env                     # Environment variables (not in git)
├── .env.example            # Environment variables template
├── biome.json              # Biome configuration for linting and formatting
├── pnpm-lock.yaml          # pnpm lockfile for dependency versions
├── pnpm-workspace.yaml     # pnpm workspace configuration
├── static-analysis.datadog.yml # Static analysis configuration
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

2. Install dependencies for all workspaces:

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

5. Start the Express server:

   ```bash
   pnpm start
   # or
   npm start
   ```

6. In a separate terminal, start the Angular development server:

   ```bash
   cd app_admin
   pnpm start
   # or
   npm start
   ```

7. Open your browser and navigate to:
   - **Customer Site**: `http://localhost:3000`
   - **Admin SPA**: `http://localhost:4200`

### Available Scripts

**Express Server (Root Directory):**

- `pnpm start` - Start the Express server
- `pnpm dev` - Start with auto-reload using nodemon
- `pnpm seed` - Populate MongoDB with sample trip data
- `pnpm lint` - Check code formatting and style with Biome
- `pnpm lint:fix` - Automatically fix code formatting issues

**Angular SPA (app_admin/ Directory):**

- `pnpm start` - Start Angular development server (<http://localhost:4200>)
- `pnpm build` - Build Angular app for production
- `pnpm test` - Run Angular unit tests
- `pnpm watch` - Build in watch mode for development

### Testing the Application

**Customer-Facing Website (Express Server - Port 3000):**

- **Home Page**: `http://localhost:3000` - Static home page with layout and navigation
- **Travel Page**: `http://localhost:3000/travel` - Dynamic page showing trip data via API consumption
- **Navigation**: Active page highlighting in both header and footer navigation
- **Error Handling**: Try visiting a non-existent route to see custom error page

**Administrative SPA (Angular - Port 4200):**

- **Admin Dashboard**: `http://localhost:4200` - Angular SPA for trip management
- **Trip Listing**: View all trips with modern card-based layout
- **Add Trip**: Create new trips with form validation
- **Edit Trip**: Update existing trip information
- **Delete Trip**: Remove trips with confirmation dialogs
- **Responsive Design**: Bootstrap 5 styling with mobile-first approach

**API Testing:**

- **Database**: Use MongoDB Compass to inspect the `travlr` database and `trips` collection
- **API Endpoints**: All endpoints support CORS for Angular SPA integration

## API Endpoints

The application provides a complete RESTful API with full CRUD operations for trip data and user authentication:

### Trip Endpoints

#### GET /api/trips

Returns a JSON array of all trips in the database.

**Response Format:**

```json
[
  {
    "_id": "...",
    "code": "GALR210214",
    "name": "Gale Reef",
    "length": "4 nights / 5 days",
    "start": "2021-02-14T00:00:00.000Z",
    "resort": "Emerald Bay",
    "perPerson": "799.00",
    "image": "reef1.jpg",
    "description": "Gale Reef Scuba Diving..."
  }
]
```

#### GET /api/trips/:tripCode

Returns JSON data for a specific trip identified by its trip code.

**Parameters:**

- `tripCode` - The unique code identifier for the trip

#### POST /api/trips

Creates a new trip in the database.

**Request Body:**

```json
{
  "code": "NEWT240101",
  "name": "New Trip",
  "length": "3 nights / 4 days",
  "start": "2024-01-01T00:00:00.000Z",
  "resort": "Paradise Resort",
  "perPerson": "599.00",
  "image": "new-trip.jpg",
  "description": "An amazing new adventure..."
}
```

**Response:** `201 Created` with the created trip object

#### PUT /api/trips/:tripCode

Updates an existing trip identified by its trip code.

**Parameters:**

- `tripCode` - The unique code identifier for the trip to update

**Request Body:** Same format as POST (excluding the code field)

**Response:** `200 OK` with the updated trip object

#### DELETE /api/trips/:tripCode

Deletes a trip identified by its trip code.

**Parameters:**

- `tripCode` - The unique code identifier for the trip to delete

**Response:** `200 OK` with confirmation message and deleted trip object

### Authentication Endpoints

#### POST /api/users/register

Registers a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:** `201 Created` with JWT token and user information

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "email": "user@example.com"
  }
}
```

#### POST /api/users/login

Authenticates a user and returns a JWT token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:** `200 OK` with JWT token and user information

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "email": "user@example.com"
  }
}
```

### Protected Routes

The following endpoints require authentication via JWT token in the Authorization header:

- `POST /api/trips` - Create new trips
- `PUT /api/trips/:tripCode` - Update existing trips  
- `DELETE /api/trips/:tripCode` - Delete trips

**Authentication Header:**

```sh
Authorization: Bearer <JWT_TOKEN>
```

### Error Responses

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created (POST)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials)
- `404` - Trip not found
- `409` - Conflict (duplicate email)
- `500` - Database error

### CORS Support

All API endpoints include CORS headers to support the Angular SPA running on `http://localhost:4200`.

## Authentication

### JWT Token Management

The application uses JSON Web Tokens (JWT) for stateless authentication:

**Token Structure:**

- **Payload**: User ID and email
- **Expiration**: 24 hours from creation
- **Signature**: HMAC SHA256 with secret key

**Token Storage:**

- **Angular SPA**: localStorage for persistence across browser sessions
- **Server-side**: Token verification via middleware

### Password Security

User passwords are secured using bcrypt:

- **Hashing**: bcrypt with 10 salt rounds
- **Verification**: Secure comparison without plaintext storage
- **Validation**: Minimum password requirements enforced

### User Model

The User schema includes:

```javascript
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  }
});
```

### Authentication Flow

1. **Registration**: User provides email and password
2. **Validation**: Email format and password strength checked
3. **Hashing**: Password hashed with bcrypt
4. **Storage**: User saved to database
5. **Token**: JWT token generated and returned
6. **Login**: User provides credentials
7. **Verification**: Password compared with hash
8. **Token**: JWT token generated and returned
9. **Access**: Token used for protected API endpoints

### Security Features

- **Password Hashing**: bcrypt with salt rounds
- **Token Expiration**: Automatic token invalidation
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Secure error messages without information leakage
- **CORS Configuration**: Proper cross-origin request handling

## Dependencies

### Express Server Dependencies

**Production Dependencies:**

- **express**: Web application framework for Node.js
- **express-handlebars**: Handlebars view engine for Express
- **mongoose**: MongoDB object modeling for Node.js
- **dotenv**: Environment variable loader
- **cookie-parser**: Cookie parsing middleware
- **morgan**: HTTP request logger middleware
- **http-errors**: HTTP error handling utility
- **debug**: Debugging utility
- **jsonwebtoken**: JWT token generation and verification
- **bcrypt**: Password hashing and verification
- **passport**: Authentication middleware
- **passport-jwt**: JWT strategy for Passport.js

**Development Dependencies:**

- **nodemon**: Development server with auto-restart
- **biome**: Fast formatter and linter for JavaScript/TypeScript

### Angular SPA Dependencies

**Production Dependencies:**

- **@angular/core**: Angular framework core
- **@angular/common**: Angular common utilities
- **@angular/forms**: Angular reactive forms
- **@angular/router**: Angular routing
- **@angular/platform-browser**: Angular browser platform
- **bootstrap**: Bootstrap 5 CSS framework
- **rxjs**: Reactive Extensions for JavaScript
- **zone.js**: Execution context for Angular

**Development Dependencies:**

- **@angular/cli**: Angular command line interface
- **@angular/build**: Angular build system
- **typescript**: TypeScript compiler
- **jasmine**: Testing framework
- **karma**: Test runner

### Key Changes in Module 5

- **RESTful API Implementation**: Created dedicated API layer with proper HTTP status codes and JSON responses
- **Separation of Concerns**: Split application into `app_api` (data layer) and `app_server` (presentation layer)
- **API-First Architecture**: Web application now consumes its own API endpoints using Fetch API
- **Enhanced Error Handling**: Comprehensive error responses for both API and web layers
- **Static Analysis**: Added Datadog static analysis configuration for code quality

### Key Changes in Module 6

- **Angular SPA Implementation**: Created comprehensive Single Page Application for administrative functionality
- **Full CRUD API**: Extended API with POST, PUT, and DELETE endpoints for complete trip management
- **Component-Based Architecture**: Implemented Angular components for trip listing, adding, editing, and deleting
- **TypeScript Integration**: Added strongly-typed models and services for better development experience
- **Bootstrap 5 Styling**: Modern, responsive UI with professional administrative interface
- **CORS Configuration**: Enabled cross-origin requests for Angular SPA to communicate with Express API
- **Reactive Programming**: Implemented RxJS observables for asynchronous API communication
- **Form Validation**: Client-side validation with Angular reactive forms
- **Error Handling**: Comprehensive error handling with user-friendly feedback messages
- **Routing**: Single-page navigation with Angular Router for seamless user experience

### Key Changes in Module 7

- **JWT Authentication**: Implemented JSON Web Token-based authentication system
- **User Registration & Login**: Complete user account management with secure password handling
- **Password Security**: bcrypt password hashing with salt rounds for secure credential storage
- **Protected Routes**: API endpoint protection with authentication middleware
- **Angular Authentication**: Login component and authentication service for SPA
- **Token Management**: JWT token storage, validation, and automatic inclusion in API requests
- **User Model**: MongoDB schema for user accounts with email validation and uniqueness
- **Security Middleware**: Passport.js integration with JWT strategy for route protection
- **Error Handling**: Comprehensive authentication error responses and validation
- **Cross-Platform Auth**: Unified authentication across Express server and Angular SPA

## Module Progress

- ✅ **Module 1**: Basic Express setup with static HTML files
- ✅ **Module 2**: MVC architecture with Handlebars templating and JSON data
- ✅ **Module 3**: Enhanced templating with dynamic JSON data rendering
- ✅ **Module 4**: MongoDB integration with Mongoose ODM and database persistence
- ✅ **Module 5**: RESTful API development and separation of concerns architecture
- ✅ **Module 6**: Angular SPA implementation with full CRUD administrative interface
- ✅ **Module 7**: JWT-based authentication and user management system
- ⏳ **Future Modules**: Role-based access control, advanced security features, real-time features

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

**Module 5:**

- RESTful API endpoint development with proper HTTP status codes
- Separation of concerns: API layer (`app_api`) and web application layer (`app_server`)
- API-first architecture with web application consuming its own API endpoints
- Comprehensive error handling for both successful and failure scenarios
- Fetch API implementation for server-to-server communication
- Enhanced testability through API layer isolation
- Foundation for future Single Page Application and mobile app development

**Module 6:**

- Angular 20 Single Page Application for administrative interface
- Complete CRUD operations (Create, Read, Update, Delete) for trip management
- Component-based architecture with reusable Angular components
- TypeScript integration with strongly-typed models and interfaces
- Bootstrap 5 responsive design with modern UI/UX patterns
- Angular services for API integration using HttpClient and RxJS observables
- Client-side routing with Angular Router for seamless navigation
- Form validation and error handling with user-friendly feedback
- CORS-enabled API communication between Angular SPA and Express server
- Professional administrative dashboard with card-based trip display

**Module 7:**

- JWT-based authentication system with stateless token management
- User registration and login endpoints with comprehensive validation
- bcrypt password hashing with salt rounds for secure credential storage
- Passport.js middleware integration with JWT strategy for route protection
- Angular authentication service with login component and token management
- HTTP interceptor for automatic JWT token inclusion in API requests
- User model with email validation and database constraints
- Protected API endpoints requiring authentication for administrative operations
- Cross-platform authentication support for both Express and Angular applications
- Comprehensive error handling for authentication failures and validation errors

**Upcoming Features:**

- Role-based access control and user permissions
- Advanced security features (rate limiting, CSRF protection)
- Real-time data synchronization
- Progressive Web App (PWA) capabilities
- User profile management and preferences

## File Organization

### Three-Layer Architecture

- **API Layer** (`/app_api`): RESTful endpoints, database models, and business logic
  - Controllers: API endpoint handlers with full CRUD operations, authentication, and JSON responses
  - Models: Mongoose schemas for trips and users with validation and indexing
  - Routes: API route definitions with parameter handling, CORS support, and authentication middleware
  - Config: Passport.js configuration for JWT authentication strategy
- **Web Layer** (`/app_server`): Customer-facing presentation logic and user interface
  - Controllers: Web page controllers that consume API endpoints
  - Views: Handlebars templates for server-side rendering
  - Routes: Web route definitions for page navigation
- **SPA Layer** (`/app_admin`): Angular Single Page Application for administration
  - Components: Reusable Angular components for trip management and authentication
  - Services: API integration services using HttpClient and RxJS with authentication
  - Models: TypeScript interfaces for type safety including authentication models
  - Routing: Client-side navigation with Angular Router and authentication guards
  - Utils: JWT interceptor for automatic token management

### Angular SPA Structure

- **Components**: Modular, reusable UI components with encapsulated logic
  - `trip-listing`: Main dashboard with trip cards and management actions
  - `add-trip`: Form component for creating new trips
  - `edit-trip`: Form component for updating existing trips
  - `trip-card`: Reusable card component for displaying trip information
  - `login`: Authentication component for user login
  - `navbar`: Navigation component with authentication state
- **Services**: Business logic and API communication layer
  - `trip-data.service`: HTTP client service for all trip-related API calls
  - `authentication.service`: Authentication service for login/logout and token management
- **Models**: TypeScript interfaces for compile-time type checking
  - `trip.ts`: Trip data structure interface
  - `user.ts`: User data structure interface
  - `auth-response.ts`: Authentication response interface
- **Routing**: Single-page navigation configuration with authentication guards
- **Utils**: Utility services for cross-cutting concerns
  - `jwt.interceptor.ts`: HTTP interceptor for automatic JWT token inclusion
  - `storage.ts`: Local storage utilities for token persistence

### Template Structure

- **Express Templates**: `main.hbs` provides the base HTML structure with header and footer partials
- **Angular Templates**: Component-based templates with Bootstrap 5 styling
- **Partials**: Reusable components like header and footer with conditional navigation highlighting
- **Views**: Individual page templates that extend the layout and display API data
- **Data Integration**: Both Express and Angular layers consume the same RESTful API

### Database Architecture

- **MongoDB**: NoSQL document database for flexible data storage
- **Mongoose**: ODM (Object Document Mapper) for schema definition and validation
- **Schema**: Trip model with validation, indexing, and proper data types
- **Seeding**: Automated scripts to populate development data
- **Environment Config**: Secure credential management with `.env` files
- **API Access**: Database operations abstracted through RESTful API layer with full CRUD support

## Contributing

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our development process and how to submit contributions.

## License

This project is licensed under the Unlicense - see the [LICENSE](LICENSE) file for details.
