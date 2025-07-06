const { spawn } = require("child_process");
const path = require("path");

const importExcel = require("./importExcel");
const importJson = require("./importJson");

const mode = process.argv[2];

async function main() {
  console.log("📦 Choose import source (excel/json):");

  try {
    if (mode === "excel") {
      await importExcel();
    } else if (mode === "json") {
      await importJson();
    } else {
      console.error("❌ Please specify 'excel' or 'json' as argument.");
      process.exit(1);
    }

    console.log("✅ Data imported successfully.");
    console.log("🚀 Starting server...");

    // ✅ Define the path before using it
    const serverPath = path.join(__dirname, "server.js");

    // 🔁 Spawn server so logs appear live
    const server = spawn("node", [serverPath], { stdio: "inherit" });

    server.on("close", (code) => {
      console.log(`🔒 Server process exited with code ${code}`);
    });

  } catch (error) {
    console.error("❌ Import failed:", error.message || error);
    process.exit(1);
  }
}

main();
