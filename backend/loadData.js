const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('../database/webappdb.sqlite');

function loadJSON(filePath, table) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const stmt = db.prepare(`INSERT INTO ${table} (subject, topic, content) VALUES (?, ?, ?)`);
    data.forEach(item => { stmt.run(item.subject || '', item.topic || '', item.content || ''); });
    stmt.finalize();
}

loadJSON('../database/gsm8k.json', 'gsm8k');
loadJSON('../database/openmathinstruct1.json', 'openmathinstruct1');

db.close();
console.log('Data loaded into SQLite DB successfully.');
