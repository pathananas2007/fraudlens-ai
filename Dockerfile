FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy all project files, including .env for Vite build-time variables (like Firebase keys)
COPY . .

# Build the Vite frontend and bundle the Express server
# Vite bakes VITE_* variables into the static frontend assets here
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy only the compiled output and package.json from builder
COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json* ./

# Install only production dependencies (since esbuild used --packages=external)
RUN npm install --omit=dev

# Set runtime environment
ENV NODE_ENV=production
EXPOSE 3000

# Start the Node.js server
CMD ["npm", "start"]
