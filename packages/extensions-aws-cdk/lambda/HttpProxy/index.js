const https = require("https");

exports.handler = async () => {
  const url = process.env.URL;
  return request(url);
};

const request = (url) => {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: "GET",
      },
      (res) => {
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed healtcheck on ${url}`));
        }

        res.on("end", function () {
          resolve();
        });
      },
    );

    req.on("error", (e) => {
      reject(e);
    });

    req.end();
  });
};
