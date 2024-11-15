// Kilde: https://chatgpt.com/  (Beholder og skriver kommentarer for læring og hva koden gjør)

import { Context } from 'hono';
import db from '../database';

export const createLesson = async (c: Context) => {
  const { courseId, title, slug, description, text } = await c.req.json();
  const info = db.prepare('INSERT INTO Lessons (course_id, title, slug, description, text) VALUES (?, ?, ?, ?, ?)').run(courseId, title, slug, description, text);
  return c.json({ id: info.lastInsertRowid, courseId, title, slug, description, text });
};


