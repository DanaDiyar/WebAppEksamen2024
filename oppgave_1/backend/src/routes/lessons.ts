// Kilde: https://chatgpt.com/  (Beholder og skriver kommentarer for læring og hva koden gjør)

import { Context } from 'hono';
import db from '../database';

export const createLesson = async (c: Context) => {
  const { courseId, title, content } = await c.req.json();
  const info = db.prepare('INSERT INTO Lessons (courseId, title, content) VALUES (?, ?, ?)').run(courseId, title, content);
  return c.json({ id: info.lastInsertRowid, courseId, title, content });
};

