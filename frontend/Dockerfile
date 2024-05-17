# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Build the application
RUN yarn build

# List files to verify build success
RUN ls -la .next

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]



