Description: This project allows users to create their own flashcard decks and auto-generate study decks using ChatGPT. I chose to include log-in capabilities where users are stored in a database. Their passwords are hashed to improve the security of the website. I also chose to store previously created decks in the database so users can go back to their study materials. Finally, users can simply put in a text input, and a new deck will be auto-generated using ChatGPT. The app was deployed using Heroku (backend) and Vercel (frontend).

Tech Stack: I used MERN (MongoDB, Express.js, React, and Node.js) as well as the Open AI API. 

Video Demo:
https://youtu.be/NsAgYXTuTNY

CLI commands to run: 

**Quick Start (Recommended):**
From the root directory (`flashcard-app/`):
```bash
npm run dev
```
This will start both the frontend (Next.js) and backend (Express) servers simultaneously.

**Alternative commands:**
- Install all dependencies: `npm run install:all`
- Run frontend only: `npm run frontend:dev`
- Run backend only: `npm run backend:dev`
- Run backend in dev mode: `npm run backend:dev` (with nodemon)

**Legacy commands (if needed):**
- Frontend: `cd frontend && npm run dev`
- Backend: `cd backend && node server.js`
