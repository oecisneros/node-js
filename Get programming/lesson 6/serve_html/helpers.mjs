"use strict";
import { readFile } from "fs/promises";
import { StatusCodes } from "http-status-codes";
import { extname } from "path";

const RESOURCES = {
  ".js": (url) => [`public/js${url}`, "text/js"],
  ".css": (url) => [`public/css${url}`, "text/css"],
  ".png": (url) => [`public/images${url}`, "image/png"],
};

const getResource = (url) => {
  const extension = extname(url);
  return RESOURCES[extension]?.(url) ?? [`views${url}.html`];
};

const writeHeader = (response, statusCode, contentType = "text/html") => {
  response.writeHead(statusCode, {
    "Content-Type": contentType,
  });
};

export const writeNotFound = (request, response) => {
  console.log("Not found", request.url);
  writeHeader(response, StatusCodes.NOT_FOUND);
  response.end("<h1>Sorry the resource you are looking for is not here.</h1>");
};

export const writeFragment = (message) => {
  return (_, response) => {
    writeHeader(response, StatusCodes.OK);
    response.end(message);
  };
};

export const writeFile = (path, contentType = "text/html") => {
  return async (request, response) => {
    try {
      const buffer = await readFile(path);
      console.log("Sending", request.url);
      writeHeader(response, StatusCodes.OK, contentType);
      response.end(buffer);
    } catch {
      writeNotFound(request, response);
    }
  };
};

export const writeStaticFile = (request, response) => {
  const [path, contentType] = getResource(request.url);
  writeFile(path, contentType)(request, response);
};
