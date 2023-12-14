const http = require("node:http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 8080;

const server = http.createServer((req, res) => {
  console.log(`Requested: ${req.url}`);
  res.writeHead(200, { "Content-Type": "text/html" });
  if (req.url == "/favicon.ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end();
    return;
  }
  if (req.url == "/") {
    fs.readFile("./index.html", (err, data) => {
      res.end(data);
      return;
    });
  }
  fs.readFile(`.${req.url}`, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      fs.readFile("./404.html", (err, errData) => {
        res.end(errData);
      });
      return;
    }
    res.end(data);
  });
});
server.listen(port, hostname, () => {
  console.log(`server running on http://${hostname}:${port}/`);
});
