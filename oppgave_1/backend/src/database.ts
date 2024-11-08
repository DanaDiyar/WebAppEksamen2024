// Kilde: https://chatgpt.com/

// database.ts
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.db'); // Opprett eller åpne SQLite-databasefilen

// Opprett tabellen hvis den ikke finnes
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT
    )
  `);
});

export default db;

