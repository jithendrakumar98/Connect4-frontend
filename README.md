# Connect 4 Frontend

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO_Client-4.x-010101?style=flat&logo=socket.io&logoColor=white)](https://socket.io/)
[![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)](https://connect4-30165.netlify.app/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=flat)](https://connect4-30165.netlify.app/)

A real-time multiplayer Connect 4 game client built with React and Socket.IO. Features live gameplay synchronization, room management, player statistics, and a dynamic leaderboard.

**🎮 [Play Now](https://connect4-30165.netlify.app/)**

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Game Features](#game-features)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **🎯 Real-time Multiplayer** — Play against opponents with instant move synchronization
- **🏆 Live Leaderboard** — Track top players and their statistics
- **🎨 Interactive UI** — Smooth animations and responsive design
- **📊 Player Analytics** — View win/loss records and game history
- **🔄 Room System** — Automatic matchmaking or join specific rooms
- **⚡ WebSocket Communication** — Fast, bidirectional updates via Socket.IO
- **📱 Responsive Design** — Works seamlessly on desktop and mobile devices
- **🎮 Intuitive Controls** — Click to drop pieces with visual feedback

---

## Demo

### Live Application
**🌐 [https://connect4-30165.netlify.app/](https://connect4-30165.netlify.app/)**

### Screenshots

```
┌─────────────────────────────────────┐
│           CONNECT 4 GAME            │
├─────────────────────────────────────┤
│  🏠 Home    🎮 Game    🏆 Board     │
├─────────────────────────────────────┤
│                                     │
│        Welcome to Connect 4!        │
│      Challenge players online       │
│                                     │
│         [Start New Game]            │
│                                     │
└─────────────────────────────────────┘
```

---

## Project Structure

```
client/
├── public/
│   ├── index.html              # HTML template
│   └── logo.png                # App logo
├── src/
│   ├── components/
│   │   ├── Analytics.css       # Analytics styling
│   │   ├── Analytics.js        # Player stats component
│   │   ├── Board.css           # Game board styling
│   │   ├── Board.js            # Game board component
│   │   ├── Cell.js             # Individual cell component
│   │   ├── Leaderboard.css     # Leaderboard styling
│   │   └── Leaderboard.js      # Leaderboard component
│   ├── pages/
│   │   ├── Game.js             # Main game page
│   │   ├── Home.css            # Home page styling
│   │   ├── Home.js             # Landing page
│   │   ├── WaitingRoom.css     # Waiting room styling
│   │   └── WaitingRoom.js      # Pre-game lobby
│   ├── utils/
│   │   ├── socket.js           # Socket.IO configuration
│   │   ├── App.css             # Global styles
│   │   ├── App.js              # Root component
│   │   ├── App.test.js         # App tests
│   │   ├── index.css           # Base styles
│   │   ├── index.js            # Entry point
│   │   ├── logo.svg            # React logo
│   │   ├── reportWebVitals.js  # Performance monitoring
│   │   └── setupTests.js       # Test configuration
├── .env                        # Environment variables
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies
├── package-lock.json           # Dependency lock
└── README.md                   # Documentation
```

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher) — [Download](https://nodejs.org/)
- **npm** or **yarn** — Package manager
- **Backend Server** — Running instance of [Connect 4 Backend](https://github.com/jithendrakumar98/connect4)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/jithendrakumar98/Connect4-frontend.git
```

### 2. Install Dependencies

**Using npm:**
```bash
npm install
```
### 3. Required Packages

The following dependencies will be installed:

- `react` — UI library
- `react-dom` — DOM rendering
- `react-scripts` — Build tooling
- `socket.io-client` — WebSocket client
- `react-router-dom` — Navigation (if used)

---

## Configuration

### Environment Variables
Add your backend server URL in .ENV:

```env
# Backend API Configuration
REACT_APP_BACKEND_URL=http://localhost:4000

# Socket.IO Configuration (optional override)
REACT_APP_SOCKET_URL=http://localhost:4000

# Environment
NODE_ENV=development
```

**Production Configuration:**
```env
REACT_APP_BACKEND_URL=https://connect4-back-4.onrender.com/
```

### Socket Configuration

Update `src/utils/socket.js` if needed:

```javascript
import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000';

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});
```

---

## Running the Application
Start the development server with hot reload:

```bash
npm start
```

The application will open at `http://localhost:3000`

### Development with Custom Port

```bash
PORT=3001 npm start
```

### Features in Development Mode

- ⚡ **Hot Module Replacement** — Instant updates without refresh
- 🐛 **Error Overlay** — Visual error reporting
- 🔍 **Source Maps** — Easy debugging
- 📊 **Performance Metrics** — Built-in monitoring

---

## Building for Production

### Create Optimized Build

```bash
npm run build
```

This creates a `build/` directory with:
- Minified JavaScript bundles
- Optimized CSS
- Compressed assets
- Service worker (optional)

### Test Production Build Locally

```bash
npm install -g serve
serve -s build -p 3000
```

Visit `http://localhost:3000` to test the production build.

---

## Deployment

### Deploying to Netlify

#### Option 1: Deploy with Git (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://www.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository

3. **Configure Build Settings**

   | Setting | Value |
   |---------|-------|
   | **Base directory** | `client` |
   | **Build command** | `npm run build` |
   | **Publish directory** | `client/build` |

4. **Add Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add `REACT_APP_BACKEND_URL` with your backend URL

5. **Deploy**

#### Option 2: Deploy with Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=build
```

### Deploying to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Configure build settings:
- **Framework**: Create React App
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `build`

### Other Platforms

The app can be deployed to:
- **GitHub Pages** — Static hosting
- **AWS S3 + CloudFront** — Scalable CDN
- **Firebase Hosting** — Google's hosting solution
- **Heroku** — Platform as a service

---

## Technologies Used

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18+ | UI framework |
| **Socket.IO Client** | 4.x | Real-time communication |
| **React Scripts** | 5.x | Build tooling |
| **React Router** | 6.x | Navigation (if used) |

### Development Tools

- **ESLint** — Code linting
- **Prettier** — Code formatting
- **Jest** — Testing framework
- **React Testing Library** — Component testing

### Styling

- **CSS3** — Custom styling
- **CSS Modules** — Scoped styles
- **Responsive Design** — Mobile-first approach

---

## Game Features

### Gameplay

- **Turn-Based System** — Alternating player moves
- **Win Detection** — Automatic checking for 4-in-a-row
  - Horizontal
  - Vertical
  - Diagonal (both directions)
- **Draw Detection** — Full board without winner
- **Move Validation** — Server-side verification

### User Interface

- **Interactive Board** — Click columns to drop pieces
- **Visual Feedback** — Hover effects and animations
- **Player Indicators** — Show current turn
- **Game Status** — Real-time updates
- **Win Animation** — Highlight winning pieces

### Multiplayer Features

- **Room System** — Create or join game rooms
- **Player Matching** — Automatic opponent pairing
- **Reconnection** — Resume games after disconnect
- **Chat System** — (If implemented) In-game messaging

### Statistics & Leaderboard

- **Personal Stats** — Track your wins/losses
- **Global Leaderboard** — Top player rankings
- **Game History** — View past matches
- **Win Rate** — Calculate success percentage

---

## Troubleshooting

### Common Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| **Cannot connect to backend** | Wrong URL in `.env` | Verify `REACT_APP_BACKEND_URL` matches backend |
| **Socket disconnects frequently** | Network issues or CORS | Check CORS settings in backend |
| **Build fails** | Missing dependencies | Run `npm install` and `npm run build` |
| **Moves not registering** | Socket not connected | Check browser console for errors |
| **Leaderboard not loading** | Backend API error | Verify backend `/api/leaderboard` endpoint |
| **White screen after deploy** | Incorrect build path | Ensure `build` directory is published |

### Debug Mode

Enable detailed logging:

```javascript
// In src/utils/socket.js
export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  debug: true  // Add this line
});
```

### Check Backend Connection

Test in browser console:

```javascript
// Check if backend is reachable
fetch('https://your-backend-url.com')
  .then(res => res.json())
  .then(data => console.log('Backend response:', data))
  .catch(err => console.error('Connection failed:', err));
```

### Clear Cache Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Contributing

Contributions are welcome! Please follow these guidelines:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
   ```bash
   npm test
   npm run build
   ```
5. **Commit with clear messages**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style

- Follow React best practices
- Use functional components with hooks
- Write meaningful component and variable names
- Add comments for complex logic
- Keep components small and focused

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

---

## Credits

**Developed by** [Jithendra Kumar](https://github.com/jithendrakumar98)

### Related Projects

- **Backend Repository:** [Connect4 Backend](https://github.com/jithendrakumar98/connect4)
- **Live Demo:** [Play Connect 4](https://connect4-30165.netlify.app/)

Built with ❤️ using React and Socket.IO.

---

## Support

### Get Help

- **🐛 Report Issues:** [GitHub Issues](https://github.com/jithendrakumar98/Connect4-front/issues)
- **💬 Discussions:** [GitHub Discussions](https://github.com/jithendrakumar98/Connect4-front/discussions)
- **📧 Email:** [Contact Developer](mailto:your.email@example.com)

### Resources

- [React Documentation](https://reactjs.org/docs)
- [Socket.IO Client Docs](https://socket.io/docs/v4/client-api/)
- [Netlify Documentation](https://docs.netlify.com/)

---

**[⬆ Back to Top](#connect-4-frontend)**
