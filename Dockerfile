# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory to the working directory inside the container
COPY . .

# Build the React app
RUN npm run build

# Set environment variable for production
ENV NODE_ENV=production

# Specify the command to run the app
CMD ["npm", "start"]


# docker build -t chatbotai . 
# docker run -p 3000:3000 chatbotai
