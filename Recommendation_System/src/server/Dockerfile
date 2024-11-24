FROM node:16-alpine

# Create app directory
WORKDIR /server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# copying packages first helps take advantage of docker layers
COPY package.json /server
RUN yarn install 
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /server/

EXPOSE 8080

CMD [ "npm", "run", "dev" ]