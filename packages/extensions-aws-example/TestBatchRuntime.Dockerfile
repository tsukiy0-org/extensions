FROM node:14

WORKDIR /opt/app

COPY dist/TestBatchRuntime .

CMD ["node", "index.js"]
