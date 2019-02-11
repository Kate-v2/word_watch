const fs = require("fs")
const { JSDOM } = require("jsdom")
// const html = fs.readFileSync("./dist/index.html")
const html = fs.readFileSync("./docs/index.html")
const dom = new JSDOM(html);

global.window = dom.window
document = global.document = window.document
global.navigator = {
  userAgent: "node.js"
}
