const fs = require("fs");

const getFileText = () => {
  const text = fs.readFileSync("./txt/read-this.txt", { encoding: "utf-8" });
  const output = `🏳️‍⚧️ [NOTIFICATION] This is what we know about avocado: \n\n${text} \n\nCreated on: ${Date.now()}`;
  console.log(output);

  fs.writeFileSync("./txt/output.txt", output);

  console.log("File written!");
};

getFileText();
