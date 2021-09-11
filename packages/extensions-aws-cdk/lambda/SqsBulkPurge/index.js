const AWS = require("aws-sdk");

exports.handler = async () => {
  const queueUrls = JSON.parse(process.env.QUEUE_URLS);

  const client = new AWS.SQS();

  const tasks = queueUrls.map(async (_) => {
    await client
      .purgeQueue({
        QueueUrl: _,
      })
      .promise();
  });

  await Promise.all(tasks);
};
