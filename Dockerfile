#clinisys front-end Docker image

# Use the official Node.js 18.x LTS image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --only=prod

# Copy the entire project directory to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the desired port (change it to match the port used by your app)
EXPOSE 3000

# Set the command to run the application
CMD ["npm", "start"]
