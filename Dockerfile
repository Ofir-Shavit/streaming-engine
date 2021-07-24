FROM node:12-alpine
WORKDIR /streaming-engine
COPY . .
RUN npm install --production
RUN npm run build
CMD ["npm", "start"]
