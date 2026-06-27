/* Minimal static file server for the SOIC Digital Campus prototype. */
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.argv[2] || 8922;
const root = __dirname;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".map": "application/json",
};

const server = http.createServer((req, res) => {
  let urlPath;
  try { urlPath = decodeURIComponent(req.url.split("?")[0]); }
  catch (e) { res.writeHead(400); res.end("Bad request"); return; }
  if (urlPath === "/") urlPath = "/index.html";
  const filePath = path.normalize(path.join(root, urlPath));

  // prevent path traversal — the resolved path must stay inside root (with a separator boundary)
  if (filePath !== root && !filePath.startsWith(root + path.sep)) {
    res.writeHead(403); res.end("Forbidden"); return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || stat.isDirectory()) {
      // try .html fallback for clean routes
      const htmlTry = filePath.replace(/\/?$/, "") + ".html";
      if (fs.existsSync(htmlTry)) return send(htmlTry, res);
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<h1 style='font-family:sans-serif'>404 — not found</h1>");
      return;
    }
    send(filePath, res);
  });
});

function send(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const stream = fs.createReadStream(filePath);
  stream.once("open", () => {
    res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream" });
    stream.pipe(res);
  });
  stream.on("error", () => {
    if (!res.headersSent) { res.writeHead(500); res.end("Server error"); }
    else res.end();
  });
}

server.listen(port, () => console.log(`SOIC Campus running at http://localhost:${port}`));
