// Kilde: https://chatgpt.com/

import Database from 'better-sqlite3';

const db = new Database('./database.sqlite');

// Opprett tabellene hvis de ikke finnes
db.exec(`
  CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS Courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS Lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    courseId INTEGER,
    title TEXT NOT NULL,
    content TEXT,
    FOREIGN KEY(courseId) REFERENCES Courses(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS Comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lessonId INTEGER,
    content TEXT NOT NULL,
    FOREIGN KEY(lessonId) REFERENCES Lessons(id) ON DELETE CASCADE
  );
`);

export default db;
