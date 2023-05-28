const fs = require("fs");
fs.readFile("./half-first.txt.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  console.log("File data:", JSON.parse(jsonString));
});