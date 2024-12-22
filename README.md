# Todo App

This Todo app is built using Next.js, Express.js, TypeScript, and MySQL. It leverages Clever Cloud for hosting the MySQL database.

## Features
- Manage Todos (CRUD operations)
- Filters for different Todo states (e.g., all, completed, pending)
- Backend API built with Express.js and TypeScript
- MySQL database hosted on Clever Cloud
- Frontend built with Next.js for server-side rendering and dynamic interactions

---

## Getting Started

### Prerequisites
- Node.js (>= 20.x)
- npm
- MySQL database (or a Clever Cloud MySQL instance)
- Environment variables configured in a `.env` file

### Setup Instructions

#### 1. Clone the Repository
```bash
git clone [<repository-url>](https://github.com/nagurudheeraj/todo-app-nooro.git)
cd todo-app-nooro
```

#### 2. Install Dependencies
Install dependencies for both the backend and frontend:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

#### 3. Configure Environment Variables
Create a `.env` file in the root directory of the `server` folder with the following contents:

```env
DB_HOST=<your-database-host>
DB_USER=<your-database-username>
DB_PASSWORD=<your-database-password>
DB_NAME=<your-database-name>

PORT=8080
```


#### 4. Start the MySQL Database
The Clever Cloud MySQL instance is already configured. If you want to set up your own MySQL instance, update the details in the .env file accordingly.

#### 5. Run the Backend Server
```bash
cd server
npm run dev
```
This will start the Express.js server with TypeScript enabled.

#### 6. Run the Frontend Server
```bash
cd client
npm run dev
```
This will start the Next.js development server.

#### 7. Access the Application
Visit the application in your browser at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

---

## Folder Structure
```
.
root
├── client
│   ├── app
│   │  ├──layout.tsx
│   │  ├──page.tsx
│   │  ├──edit-todo
│   │  └──create-todo
│   ├── components
│   ├── hooks
│   ├── lib
│   ├── redux
│   ├── types
│   ├── .env
│   └── config files
├── server
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── services
│   │   ├── db
│   │   └── types
│   ├── .env
│   └── config files
```

---

## Scripts

### Backend (server)
| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start the development server         |

### Frontend (client)
| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start the Next.js development server |

---

## Deployment

### Backend
The backend can be deployed to any Node.js hosting platform. Ensure the `.env` file is configured correctly and the MySQL database credentials are accurate.

### Frontend
The frontend can be deployed to platforms like Vercel or Netlify.

### Database
The MySQL database is hosted on Clever Cloud. Ensure proper configurations for production access.

---

## License
This project is open-source and does not have a specific license. Anyone is free to clone, modify, and use it.

---

## Contact
For any questions or suggestions, please contact:
- Email: dheerajnaguru@gmail.com

