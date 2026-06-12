FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
COPY backend/prisma ./prisma/
RUN npm ci
COPY backend/ .
CMD ["sh", "-c", "npx prisma generate && node server.js"]
