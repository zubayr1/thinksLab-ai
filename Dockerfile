# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

ARG github_access


# Install Git
RUN apt-get update && apt-get install -y git

# Clone your Git repository
RUN git clone https://github.com/zubayr1/thinksLab-ai.git .

# Copy .env file
COPY .env ./

# Copy package.json and package-lock.json (if exists) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Build the React app
RUN npm run build

# Set environment variable for production
ENV NODE_ENV=production

# Specify the command to run the app
CMD ["npm", "start"]


# docker build -t chatbotai . 
# docker run -p 3000:3000 chatbotai