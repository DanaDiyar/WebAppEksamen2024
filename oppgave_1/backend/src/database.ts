// Kilde: https://chatgpt.com/

import Database from "better-sqlite3";

// Oppretter database 
const db = new Database("database.db", { verbose: console.log });

// Oppretter tabell 
db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT
  );
`);

export default db;
