import fs from "fs";
import path from "path";
import express from "express";

import React from "react";
import juice from "juice";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

// The port on which the server runs
const PORT = 8000;

const app = express();

// Use express JSON middleware for JSON parsing
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "..", "build")));

const generateHTML = (document) => {
  // Read the application index HTML document from build
  let html;
  try {
    html = fs.readFileSync(path.resolve("./build/index.html"), "utf-8");
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error occurred.");
  }

  // Read the bootstrap stylesheet from build
  const bootstrapStyles = fs.readFileSync(
    path.resolve("./build/bootstrap.min.css"),
    "utf-8"
  );

  const customStyles = fs.readFileSync(
    path.resolve("./src/index.css"),
    "utf-8"
  );

  // Render the React application into document
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${ReactDOMServer.renderToString(
      <App document={document} />
    )}</div>`
  );

  // Apply styles to document
  html = juice.inlineContent(html, bootstrapStyles);
  html = juice.inlineContent(html, customStyles);
  return html;
};

/**
 * Route: handle requests for HTML documents.
 */
app.post("/html", async (req, res) => {
  let html;
  try {
    html = generateHTML(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred.");
  }

  res.set("Content-Type", "text/html");
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
