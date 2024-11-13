// Kilde: https://chatgpt.com/  (Beholder og skriver kommentarer for læring og hva koden gjør)

import { Hono } from "hono";
import { cors } from "hono/cors";
import sqlite3 from "sqlite3";
import { serve } from "@hono/node-server";

import { getCourses, createCourse, deleteCourse } from './routes/courses';
import { createLesson } from './routes/lessons';
import { createComment } from './routes/comments';
import db from "./database";

const app = new Hono();

// Legg til CORS-middleware
app.use("/*", cors());

// Ruter for kurs
app.get('/courses', getCourses);
app.post('/courses', createCourse);
app.delete('/courses/:id', deleteCourse);

// Ruter for leksjoner og kommentarer
app.post('/lessons', createLesson);
app.post('/comments', createComment);

// Angi portnummer og start serveren
const port = 4001;
console.log(`Server kjører på http://localhost:${port}`);
serve({ fetch: app.fetch, port });

// Viser en melding på at serveren kjører selvom det ikke er noe data på serveren enda
app.get('/', (c) => {
    return c.text('Serveren kjører. Velkommen til API-et!');
  });

  // Henter alle brukere fra databasen og returnerer som JSON
app.get('/api/users', async (c) => {
    const users = db.prepare('SELECT * FROM Users').all();
    return c.json(users);
  });
  
  // Henter alle kurs fra databasen og returnerer som JSON
  app.get('/api/courses', async (c) => {
    const courses = db.prepare('SELECT * FROM Courses').all();
    return c.json(courses);
  });
  
  // Henter alle leksjoner fra databasen og returnerer som JSON
  app.get('/api/lessons', async (c) => {
    const lessons = db.prepare('SELECT * FROM Lessons').all();
    return c.json(lessons);
  });
  
  // Henter alle kommentarer fra databasen og returnerer som JSON
  app.get('/api/comments', async (c) => {
    const comments = db.prepare('SELECT * FROM Comments').all();
    return c.json(comments);
  });

export default app;