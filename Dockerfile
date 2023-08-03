FROM node:18.16.0

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/
RUN npm ci --only=production

# Copy project files into the container
COPY . /app

RUN npm run build

# Expose port
#EXPOSE 3000

# Start server
CMD ["npm", "run", "start"]