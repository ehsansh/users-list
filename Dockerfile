# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

WORKDIR /app

# Ensure the container runs as root to avoid permission issues during installation
USER root

# Copy package.json and package-lock.json first for efficient dependency installation
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Create the final production image
FROM node:18-alpine

WORKDIR /app

# ✅ Use the existing "node" user (Fixes the error: "unable to find user nextjs")
USER node

# Copy only necessary files from the builder stage
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./

# Expose the port the app will run on
EXPOSE 3000

# Health check to ensure the server is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s \
    CMD curl -f http://localhost:3000 || exit 1

# ✅ Start the Next.js server with runtime environment variables (instead of baking them into the image)
CMD ["sh", "-c", "NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL \
    NEXT_PUBLIC_FLAG_BASE_URL=$NEXT_PUBLIC_FLAG_BASE_URL \
    NEXT_PUBLIC_RESULTS_PER_PAGE=$NEXT_PUBLIC_RESULTS_PER_PAGE \
    npm start"]
