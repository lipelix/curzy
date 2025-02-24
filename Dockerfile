# Use the official Node.js 14 image as the base image
FROM bitnami/node:17.7.1

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json .

# Install the dependencies
RUN npm install

COPY tsconfig.json .
COPY src src

# Start the app
CMD [ "npm", "run", "start" ]