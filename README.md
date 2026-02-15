# SkillSwap Connect

SkillSwap Connect is a modern web application built with React, TypeScript, and Node.js that enables users to connect, share skills, and collaborate on projects. The platform features real-time communication, user authentication, and a rich set of UI components.

## 🚀 Features

### Frontend
- **Modern UI/UX**: Built with React, TypeScript, and Tailwind CSS
- **Component Library**: Utilizes Shadcn UI components for a consistent and beautiful interface
- **Real-time Updates**: Socket.io integration for instant notifications and messaging
- **Responsive Design**: Mobile-friendly interface that works across all devices
- **Form Handling**: Advanced form management with React Hook Form and Zod validation
- **State Management**: Efficient state handling with React Query
- **Code Editor**: Integrated CodeMirror for code sharing and collaboration

### Backend
- **RESTful API**: Node.js and Express-based backend
- **Real-time Communication**: Socket.io for instant messaging and notifications
- **Authentication**: Secure user authentication and authorization
- **Database Integration**: MongoDB for data persistence
- **Middleware**: Custom middleware for request validation and error handling

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI Components
- React Router DOM
- React Query
- Socket.io Client
- React Hook Form
- Zod

### Backend
- Node.js
- Express
- Socket.io
- MongoDB
- JWT Authentication

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install frontend dependencies:
```bash
cd skillswap-connect-code
npm install
```

3. Install backend dependencies:
```bash
cd Backend
npm install
```

4. Create environment variables:
   - Frontend: Create a `.env` file in the root directory
   - Backend: Create a `.env` file in the Backend directory

5. Start the development servers:
   - Frontend:
   ```bash
   npm run dev
   ```
   - Backend:
   ```bash
   cd Backend
   npm start
   ```

## 🏗️ Project Structure

```
skillswap-connect-code/
├── src/                    # Frontend source code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and configurations
│   └── utils/             # Helper functions
├── Backend/               # Backend source code
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── config/            # Configuration files
└── public/                # Static assets
```

## 🔧 Development

- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Shadcn UI for the amazing component library
- The React and TypeScript communities
- All contributors and supporters

