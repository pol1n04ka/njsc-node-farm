const fs = require("fs");
const http = require("http");
const replaceTemplate = require("./modules/replaceTemplate");

// Templates
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/card.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  const params = new URLSearchParams(req.url);
  const productId = params.get("/product?id");

  switch (pathName) {
    case "/" || "/overview":
      res.writeHead(200, { "Content-type": "text/html" });
      const products = productData.map((product) =>
        replaceTemplate(templateCard, product)
      );
      const overview = templateOverview.replace(
        /{%PRODUCTS_CARDS%}/g,
        products
      );

      res.end(overview);
      break;
    case `/product?id=${productId}`:
      res.writeHead(200, { "Content-type": "text/html" });
      const product = productData[new Number(productId)];
      const output = replaceTemplate(templateProduct, product);
      res.end(output);
      break;
    case "/api":
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
      break;
    default:
      res.writeHead(404, {
        "Content-type": "text/html",
        "my-own-header": "hello",
      });
      res.end("<h1>Page not found, sorry</h1>");
      break;
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening port 8000 on ip 127.0.0.1s");
});
