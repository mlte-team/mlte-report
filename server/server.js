import fs from "fs";
import path from "path";
import express from "express";

import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

const PORT = 8000;

const app = express();

// Use express JSON middleware for JSON parsing
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.get('/', (req, res) => {
    fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send("An error occurred.");
        }
        return res.send(
          data.replace(
            '<div id="root"></div>',
            `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
          )
        );
      });
})

/**
 * Route: handle requests for rendered reports.
 */
app.post('/', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`)
})
