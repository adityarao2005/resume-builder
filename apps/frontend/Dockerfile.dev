# Development dockerfile for frontend
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json .

# Install dependencies
RUN npm install

ENV BACKEND_PATH=http://localhost:8080

# Bundle app source
COPY . .

# Expose port and start application
CMD ["npm", "run", "dev"]