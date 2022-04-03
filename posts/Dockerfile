FROM node:alpine
WORKDIR /app
COPY package.json ./
RUN npm install --only=prod
COPY . .
EXPOSE 4222
CMD ["npm","start"]