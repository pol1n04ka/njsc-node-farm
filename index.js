const fs = require("fs");
const http = require("http");

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

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

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

      // console.log(products);
      res.end(overview);
      // res.end(products);
      break;
    case "/items":
      res.end("hello from items page");
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
