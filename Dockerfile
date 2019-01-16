FROM node:9.0
WORKDIR /app
COPY package.json /app
COPY dist /app
RUN npm install --only=production
EXPOSE 8080
CMD [ "npm", "start" ]
