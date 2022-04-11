import fs from "fs";
import path from "path";
import express from "express";

import React from "react";
import juice from 'juice';
import puppeteer from 'puppeteer';
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

// The port on which the server runs
const PORT = 8000;

const app = express();

// Use express JSON middleware for JSON parsing
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '..', 'build')))

/**
 * Route: render the report for local development.
 */
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

const generatePDF = async (html) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Inject content into the page
    await page.setContent(html)

    // Render the page to PDF
    const pdfBuffer = await page.pdf()

    await page.close()
    await browser.close()

    return pdfBuffer
}

/**
 * Route: handle requests for rendered PDF reports.
 */
app.post('/', async (req, res) => {
    // Read the application index HTML document from build
    let html
    try {
        html = fs.readFileSync(path.resolve("./build/index.html"), "utf-8")
    } catch (err) {
        console.log(err)
        return res.status(500).send("An error occurred.");
    }

    // Read the application stylesheet from build
    let style
    try {
        style = fs.readFileSync(path.resolve("./build/static/css/main.073c9b0a.css"), "utf-8")
    } catch (err) {
        console.log(err)
        return res.status(500).send("An error occurred.");
    }

    // Render the React application into document
    html = html.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    
    // Apply styles to document
    html = juice.inlineContent(html, style)

    // Generate a PDF from the HTML document
    const pdf = await generatePDF(html);

    res.set("Content-Type", "application/pdf")
    res.send(pdf)
})

app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`)
})
