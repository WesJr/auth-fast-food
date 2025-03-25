# Auth Fast Food API

Auth Fast Food API is a serverless authentication service built with Node.js, TypeScript, and the Serverless Framework. It provides authentication functionality for a fast food application.

## Prerequisites
- Node.js (v20.x or later)
- npm or yarn
- AWS CLI configured with appropriate credentials
- Serverless Framework CLI

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd auth-fast-food
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
SERVERLESS_ORG_NAME=your-serverless-org
AWS_REGION=us-east-1
# Add other environment variables as needed for database connection, JWT secret, etc.
```

## Running Locally

To run the application locally using the Serverless Offline plugin:

```bash
npm start
```

This will start the local development server, typically at http://localhost:3000.

You can test the health check endpoint at:
```
GET http://localhost:3000/health
```

## Project Structure

- `src/handlers/` - Contains Lambda function handlers
- `serverless.yml` - Serverless Framework configuration

## Deployment

To deploy to AWS:

```bash
serverless deploy --stage dev
```

You can specify different stages like `prod` or `staging` as needed.

## Available Scripts

- `npm start` - Run the application locally
- `npm test` - Run tests (currently not configured)

## Technologies Used

- Node.js with TypeScript
- Serverless Framework
- Express.js
- PostgreSQL with Sequelize ORM
- JWT for authentication
- bcrypt for password hashing
