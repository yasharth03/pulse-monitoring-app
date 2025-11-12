💓 Pulse: A Real-time Website Monitor
This is Pulse, a full-stack app I built from scratch to watch over my websites. It pings them every minute and shows me, in real time, if they're up (and how fast they are) on a slick dashboard.

No more guessing if a site is down—this tells me instantly.

(Pro-tip: Add a screenshot of your cool dashboard here!)

🛠️ What's Under the Hood?
This project is a complete microservice application, with all the pieces working together.

Frontend (The Face): A beautiful, responsive dashboard built with React and TypeScript. It features:

Framer Motion for smooth animations.

Recharts for live-updating latency graphs.

Backend API (The Brain): A Node.js & Express server that handles saving new sites and serving up all the performance data for the dashboard.

Backend Worker (The Laborer): A separate Node.js service that runs on a node-cron schedule. Its only job is to ping all the websites every minute and save the results.

Database: MongoDB, using its powerful Time Series feature to store millions of pings super efficiently.

DevOps: The entire 3-service app (plus the database) is fully containerized with Docker and Docker Compose.

🏃 How to Run It (The Easy Way)
You just need Docker Desktop installed and running.

Clone this repo:

Bash

git clone https://github.com/YourUsername/pulse-monitoring-app.git
cd pulse-monitoring-app
Create your .env file: Copy the MONGO_ credentials from the docker-compose.yml file into a new .env file. (Or just make up your own username and password and update both files!)

Run it! This one command builds and starts everything:

Bash

docker-compose up --build
Open the app: Go to http://localhost:5173 in your browser.

🚀 What's Next?
This is a great foundation, but I plan to add more:

[ ] Deploy it to a real cloud (like AWS or Kubernetes).
These are my future plans for the project.
[ ] Add user accounts (so people can have their own private dashboards).

[ ] Set up real alerts (like sending an email or text when a site goes down).
