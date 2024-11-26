# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the rest of the application code to the working directory
COPY . .

# Install the application dependencies
RUN npm install

RUN npm run build

RUN npm prune --omit=dev

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
