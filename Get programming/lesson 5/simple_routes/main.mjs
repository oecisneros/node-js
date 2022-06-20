"use strict";
import { createServer } from "http";
import { StatusCodes } from "http-status-codes";

const ROUTES = {
  "/info": "Info Page",
  "/contact": "Contact Us",
  "/about": "Learn More About Us.",
  "/hello": "Say hello by emailing us here",
  "/error": "Sorry the page you are looking for is not here.",
};

const prepareResponse = (request) => ROUTES[request.url] || "Hello, Node!";

const writeMessage = (response, message) => {
  response.writeHead(StatusCodes.OK, {
    "Content-Type": "text/html",
  });
  response.end(`<h1>${message}</h1>`);
};

const serveRequest = (request, response) => {
  const message = prepareResponse(request);
  writeMessage(response, message);

  console.log(`Sent a response : ${message}`);
};

const PORT_NUMBER = 4000;
createServer(serveRequest).listen(PORT_NUMBER);

console.log(`The server has started and is listening on port: ${PORT_NUMBER}`);
