const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();
const db = new sqlite3.Database(process.env.DB_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) console.error("❌ DB connection failed:", err.message);
  else console.log("✅ Connected to SQLite DB");
});
module.exports = db;
