# Development dockerfile for frontend
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./

# Install dependencies
RUN npm install

ENV BACKEND_PATH=http://localhost:8080
ENV OUTPUT_MODE=standalone

# Bundle app source
COPY . .

RUN npm run build

# Expose port and start application
CMD ["npm", "start"]