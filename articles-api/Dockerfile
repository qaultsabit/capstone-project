# Stage 1: Build Stage
FROM node:16 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Stage 2: Production Stage
FROM node:16-alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE 8787

CMD ["npm", "start"]