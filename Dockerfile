FROM node:16.13.0

ADD . /workspace

WORKDIR /workspace

ADD package.json /workspace
ADD package-lock.json /workspace

RUN npm install

RUN npm install pm2 -g

EXPOSE 5000
ENV TZ Etc/UTC

CMD ["pm2-runtime", "app.js"]
