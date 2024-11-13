// Kilde: https://chatgpt.com/  (Beholder og skriver kommentarer for læring og hva koden gjør)

import { Context } from 'hono';
import db from '../database';

export const createComment = async (c: Context) => {
  const { lessonId, content } = await c.req.json();
  const info = db.prepare('INSERT INTO Comments (lessonId, content) VALUES (?, ?)').run(lessonId, content);
  return c.json({ id: info.lastInsertRowid, lessonId, content });
};

