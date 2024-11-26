# Use the latest LTS version of Node.js based on Alpine Linux
FROM node:lts-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Verify files are copied correctly
RUN ls -la /usr/src/app

# Build app
RUN npm run build

# Verify build output
RUN ls -la /usr/src/app

# Remove dev dependencies
RUN npm prune --production

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
