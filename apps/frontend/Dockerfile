# Development dockerfile for frontend
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port and start application
CMD ["npm", "run", "dev"]