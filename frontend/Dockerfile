# Use official Node image for building the frontend
FROM node:18-alpine AS build

WORKDIR /app

# Copy package info and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Use lightweight Nginx for serving statically generated files
FROM nginx:alpine

# Copy built assets to Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Update Nginx config if needed to route SPA requests correctly
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
