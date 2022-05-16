
FROM node:16
LABEL key="email"
 
WORKDIR /usr/src/app
 
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
 
COPY package.json /usr/src/app/
RUN npm install
 
COPY . /usr/src/app
 
ENV PORT 3003
EXPOSE $PORT
CMD [ "npm", "start" ]