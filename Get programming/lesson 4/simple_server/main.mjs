"use strict";
import { createServer } from "http";
import { StatusCodes } from "http-status-codes";

const serveRequest = (request, response) => {
  console.log("Received an incoming request:", request.url);

  const message = "<h1>Hello, Node!</h1>";
  response.writeHead(StatusCodes.OK, {
    "Content-Type": "text/html",
  });
  response.end(message);

  console.log(`Response : ${message}`);
};

const PORT_NUMBER = 4000;
createServer(serveRequest).listen(PORT_NUMBER);

console.log(`The server has started and is listening on port: ${PORT_NUMBER}`);
