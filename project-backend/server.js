const express = require("express");
const cors = require("cors");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const EXCEL_FILE_PATH = path.join(__dirname, "data", "ticket_data.xlsx");

app.get("/data", (req, res) => {
  try {
    if (!fs.existsSync(EXCEL_FILE_PATH)) {
      return res.status(404).json({ success: false, message: "File not found." });
    }
    const workbook = xlsx.readFile(EXCEL_FILE_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error reading file." });
  }
});

app.listen(port, () => console.log(`🚀 Backend running on http://localhost:${port}/data`));
