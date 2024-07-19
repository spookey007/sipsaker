# Base image
FROM node:latest

# Install sipsak
RUN apt-get update && \
    apt-get install -y sipsak

# Create app directory
WORKDIR /app

# Copy app.js from GitHub repository
RUN apt-get install -y curl && \
    curl -o app.js https://raw.githubusercontent.com/spookey007/sipsaker/main/app.js

# Install dependencies
RUN npm install express

# Expose port 3033 for the app
EXPOSE 3033

# Start the app
CMD ["node", "app.js"]