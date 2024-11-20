# Spyne Assignment

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This project is designed to handle a robust backend and client-side interface, implementing key features that showcase CRUD operations, middleware integration, and efficient service handling.

## Features
- RESTful API implementation.
- File upload and management.
- Authentication and middleware integration.
- Modularized structure for scalability.

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm
- A MongoDB instance

### Steps
1. Clone the repository:
   ```bash  
   git clone <repository-url>  
   cd spyneAssignment-main  
   ```  
2. Install server dependencies:
   ```bash  
   cd server  
   npm install  
   ```  
3. Start the backend server:
   ```bash  
   node server.js  
   ```  
4. Install client dependencies:
   ```bash  
   cd ../client  
   npm install  
   ```  
5. Start the frontend server:
   ```bash  
   npm run dev  
   ```  

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js,Multer,Cloudinary
- **Database**: MongoDB
- **Styling**: Tailwind CSS

## Project Structure
```
spyneAssignment-main/  
├── client/           # Frontend application  
├── server/           # Backend application  
│   ├── controllers/  # Business logic and API handlers  
│   ├── middleware/   # Middleware functions  
│   ├── models/       # Database models  
│   ├── routes/       # API route definitions  
│   ├── services/     # Service layer for abstraction  
│   ├── utils/        # Utility functions  
│   ├── server.js     # Application entry point  
├── README.md         # Project documentation  
```  

## API Documentation
The API provides the following functionalities:
1. **Authentication**:
    - `POST /auth/login`
    - `POST /auth/register`

2. **File Management**:
    - `POST api/cars`
    - `GET /api/cars/:id`

3. **CRUD Operations**:
    - Example: `GET /resource`, `POST /resource`, etc.

Refer to the [Postman API Collection](https://www.postman.com/chiragpunia/workspace/test/collection/34116488-3dbc4e60-e2eb-4265-9a03-3f9fd8e914f0?action=share&creator=34116488) for detailed endpoint documentation.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License
This project is licensed under the MIT License.
