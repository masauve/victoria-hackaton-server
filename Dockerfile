FROM    openshift3/nodejs-010-rhel7

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install --production

# Bundle app source
COPY . /src

EXPOSE  8081
CMD ["node", "/src/server.js"]
