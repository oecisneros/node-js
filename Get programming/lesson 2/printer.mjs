"use strict";
import { messages } from "./messages.mjs";

const printMessages = (arr) =>
  arr.forEach((message, i) => console.log(`${i + 1}: ${message}`));

printMessages(messages);
