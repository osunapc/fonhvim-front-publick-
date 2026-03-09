# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build argument for API URL
ARG API_URL=http://localhost:3000
RUN sed -i "s|http://localhost:3000|$API_URL|g" src/environments/environment.ts && \
    sed -i "s|http://localhost:3000|$API_URL|g" src/environments/environment.development.ts

RUN npm run build

# Stage 2: Production (Nginx)
FROM nginx:alpine

# Copy built browser assets
COPY --from=builder /app/dist/front-express/browser /usr/share/nginx/html

# Custom nginx config to handle Angular routing
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
