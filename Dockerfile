FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
COPY backend/prisma ./prisma/
RUN npm ci
RUN npx prisma generate
COPY backend/ .
EXPOSE 3000
CMD ["node", "server.js"]
