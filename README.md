# Node MongoDB Application

This project is a Node.js application that integrates with MongoDB using Mongoose. It provides a simple API for managing users, including creating and retrieving user information.

## Project Structure

```
node-mongo-app
├── src
│   ├── index.js          # Entry point of the application
│   ├── app.js            # Express application setup
│   ├── config            # Configuration settings
│   ├── db                # MongoDB connection logic
│   ├── models            # Mongoose models
│   ├── controllers       # Request handling logic
│   ├── routes            # API routes
│   └── services          # Business logic
├── tests                 # Test files
│   ├── unit              # Unit tests
│   └── integration       # Integration tests
├── package.json          # NPM configuration
├── jest.config.js        # Jest configuration
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore file
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd node-mongo-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

### Running the Application

To start the application, run:
```
npm start
```

### Running Tests

To run the unit and integration tests, use:
```
npm test
```

## API Endpoints

- `POST /users` - Create a new user
- `GET /users` - Retrieve all users

## License

This project is licensed under the MIT License.