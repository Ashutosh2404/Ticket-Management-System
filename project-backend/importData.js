const importExcel = require("./importExcel");
const importJson = require("./importJson");

const type = process.argv[2]; // excel or json

if (type === "excel") {
  importExcel();
} else if (type === "json") {
  importJson();
} else {
  console.error("❌ Invalid input type. Use 'excel' or 'json'");
}
