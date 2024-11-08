// Kilde: https://chatgpt.com/  (Beholder og skriver kommentarer for læring og hva koden gjør)

import { Hono } from "hono";
import { cors } from "hono/cors";
import sqlite3 from "sqlite3";

const app = new Hono();

app.use("/*", cors());

// Åpne eller opprett SQLite-database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Oppretter en enkel tabell for å teste
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )
  `);

  // Legger til placeholder data (hvis det er tomt)
  db.get("SELECT COUNT(*) AS count FROM users", (err, row) => {
    if (err) {
      console.error("Error checking users table:", err.message);
    } else if (row.count === 0) {
      
      // Placeholder data
      const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
      stmt.run("John Doe", "john.doe@example.com");
      stmt.run("Jane Smith", "jane.smith@example.com");
      stmt.finalize();
    }
  });
});

// Hente placeholder data fra tabellen 
app.get("/users", (c) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(c.json(rows));
      }
    });
  });
});

// Håndtering av serverfeil
app.onError((err: any, c) => {
  console.error(err);
  return c.json(
    {
      error: {
        message: err?.message || "Unknown error",
      },
    },
    { status: 500 }
  );
});

export default app;
