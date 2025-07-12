FROM node:19-alpine

# Set VITE env var dynamically
ARG api_base_url

# Set working directory
WORKDIR /app

# Copy dependencies and install
COPY package*.json .
RUN npm i --silent

# Copy source code
COPY . .

# Inject env var into .env file (for Vite to use)
RUN echo "VITE_API_BASE_URL=${api_base_url}" > .env

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev"]
