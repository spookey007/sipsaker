DOCKER FILE:
# Base image
FROM node:latest

# Install sipsak and nano
RUN apt-get update && \
    apt-get install -y sipsak nano

# Create app directory
WORKDIR /app

# Copy app.js from GitHub repository
RUN apt-get install -y curl && \
    curl -o app.js https://raw.githubusercontent.com/spookey007/sipsaker/main/app.js?$(date +%s) && \
    apt-get remove -y curl && \
    apt-get autoremove -y

# Install dependencies
RUN npm install express

# Expose port 3033 for the app
EXPOSE 3033

# Start the app
CMD ["node", "app.js"]

using uptime or postman/thunder payload,

POST request to 

https://sipsaker.galico.io/sipsak

json payload:

{
    "hostIp": "chaesfood.domainstacks.net"
}
