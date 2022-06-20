"use strict";
// https://dev.to/darkmavis1980/how-to-use-es-modules-with-nodejs-4ncn
// Remember to install the latest stable version of node: sudo n stable
import { createServer } from "http";
import { get, serveContent } from "./router.mjs";
import { writeFile, writeFragment, writeStaticFile } from "./helpers.mjs";

get("/", writeFile("views/index.html"));
get("/contact", writeFragment("<h1>Contact Us</h1>"));
get("/about", writeFragment("<h1>Learn More About Us.</h1>"));
get("/hello", writeFragment("<h1>Say hello</h1>"));
get("*", writeStaticFile);

const PORT_NUMBER = 4000;
createServer().on("request", serveContent).listen(PORT_NUMBER);

console.log(`The server has started and is listening on port: ${PORT_NUMBER}`);
