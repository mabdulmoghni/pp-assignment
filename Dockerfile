# Stage 1: Build Stage
FROM node:14-alpine AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .

# Stage 2: Production Stage
FROM node:14-alpine

WORKDIR /usr/src/app
COPY --from=build /usr/src/app .
# Create a non-root user
RUN addgroup -g 1001 nodeuser && \
    adduser -u 1001 -G nodeuser -s /bin/sh -D nodeuser
# Change ownership to the non-root user
RUN chown -R nodeuser:nodeuser .
# Switch to the non-root user
USER nodeuser

# Expose the port on which the app will run
EXPOSE 3000
# Command to run the application
CMD ["node", "server.js"]
