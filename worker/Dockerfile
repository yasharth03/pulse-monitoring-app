FROM node:18-alpine
WORKDIR /app
COPY package*.json ./

# We need all packages since we use 'nodemon'
RUN npm install

COPY . .
RUN npm run build

# No EXPOSE needed, this service doesn't listen for requests

CMD ["npm", "start"]