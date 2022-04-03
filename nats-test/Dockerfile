FROM node:alpine
 
WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .
EXPOSE 8222 
CMD ["npm", "run", "publish"]