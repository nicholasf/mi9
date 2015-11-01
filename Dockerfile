FROM node:4.2.1

COPY . /app

RUN cd /app; npm install
EXPOSE 8080
CMD ["node", "/app/app.js"]

