const https = require("https");

exports.handler = async (options) => {
  return request(options);
};

const request = (options) => {
  return new Promise((resolve, reject) => {
    const req = https.request(
      options.url,
      {
        method: options.method,
        headers: options.headers,
      },
      (res) => {
        let body = "";

        res.on("data", (data) => {
          body += data;
        });

        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            body,
          });
        });
      },
    );

    req.on("error", (e) => {
      reject(e);
    });

    req.end();

    options.body && req.write(new TextEncoder().encode(options.body));
  });
};
