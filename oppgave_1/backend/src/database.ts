// Kilde: https://chatgpt.com/

import Database from 'better-sqlite3';

const db = new Database('database.sqlite');

// Dropper tabell om de allerede eksisterer
db.exec(`DROP TABLE IF EXISTS Users`);
db.exec(`DROP TABLE IF EXISTS Courses`);
db.exec(`DROP TABLE IF EXISTS Lessons`);
db.exec(`DROP TABLE IF EXISTS Comments`);

// Opprett Users-tabellen
db.exec(`
  CREATE TABLE Users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  );
`);

// Opprett Courses-tabellen
db.exec(`
  CREATE TABLE Courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE, -- slug må være unik for kurs
    description TEXT,
    category TEXT
  );
`);

// Opprett Lessons-tabellen
db.exec(`
  CREATE TABLE Lessons (
    id TEXT PRIMARY KEY,
    course_id TEXT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE, -- slug må være unik for leksjoner
    description TEXT,
    text TEXT,
    FOREIGN KEY (course_id) REFERENCES Courses(id) ON DELETE CASCADE
  );
`);

// Opprett Comments-tabellen
db.exec(`
  CREATE TABLE Comments (
    id TEXT PRIMARY KEY,
    lesson_slug TEXT NOT NULL,
    created_by TEXT,
    comment TEXT NOT NULL,
    FOREIGN KEY (lesson_slug) REFERENCES Lessons(slug) ON DELETE CASCADE
  );
`);

export default db;

