const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");

const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev: false });
const handle = app.getRequestHandler();

const port = process.env.port || 443;

app.prepare().then(() => {
  const options = {
    key: fs.readFileSync("anselmo.local.key").toString(),
    cert: fs.readFileSync("anselmo.local.crt").toString(),
  };

  console.log(options);

  createServer(options, (req, res) => {
    const parseUrl = parse(req.url, true);
    const { pathname, query } = parseUrl;

    if (pathname === "/a") {
      app.render(req, res, "/a", query);
    } else if (pathname === "/b") {
      app.render(req, res, "/b", query);
    } else {
      handle(req, res, parseUrl);
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log("listos en el puerto", port);
  });
});
