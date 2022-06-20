"use strict";
import { createServer } from "http";
import { StatusCodes } from "http-status-codes";

const appendTo = (body) => (data) => body.push(data);

const getJSONString = (value) => JSON.stringify(value, null, 2);

const writeContents = (response, body) => () => {
  const contents = Buffer.concat(body).toString();
  console.log(`Request Body Contents: ${contents}`);

  response.writeHead(StatusCodes.OK, {
    "Content-Type": "text/html",
  });
  response.end(`<h1>Request Body Contents: ${contents}</h1>`);
};

const serveRequest = (request, response) => {
  const body = [];
  request.on("data", appendTo(body));
  request.on("end", writeContents(response, body));

  console.log("Method:", request.method);
  console.log("URL:", request.url);
  console.log("Headers:", getJSONString(request.headers));
};

const PORT_NUMBER = 4000;
createServer().on("request", serveRequest).listen(PORT_NUMBER);

console.log(`The server has started and is listening on port: ${PORT_NUMBER}`);

console.log(
  "Use the following command to test the server:",
  `curl --data "username=Jon&password=secret" http://localhost:${PORT_NUMBER}`
);
