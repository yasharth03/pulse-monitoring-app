# Start from a Node.js 20 base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Vite's default port is 5173. We expose it.
EXPOSE 5173

# The command to run the development server
# '--host' makes it accessible from outside the container
CMD ["npm", "run", "dev"]