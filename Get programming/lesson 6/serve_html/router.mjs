"use strict";
import { writeNotFound } from "./helpers.mjs";

const ROUTES = {
  GET: { "*": writeNotFound },
};

export const get = (url, action) => {
  ROUTES["GET"][url] = action;
};

export const serveContent = (request, response) => {
  try {
    const GET = ROUTES[request.method];
    const handler = GET[request.url] ?? GET["*"];
    handler?.(request, response);
  } catch (err) {
    console.log(err);
  }
};
