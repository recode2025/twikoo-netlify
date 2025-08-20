// netlify/functions/proxy.js
const fetch = require("node-fetch");

exports.handler = async function (event) {
  const url = event.path.replace("/.netlify/functions/proxy/", "");
  const targetUrl = decodeURIComponent(url);

  try {
    const response = await fetch(targetUrl);
    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // 解決 CORS
        "Content-Type": response.headers.get("content-type") || "text/plain",
      },
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `Proxy Error: ${err.message}`,
    };
  }
};
