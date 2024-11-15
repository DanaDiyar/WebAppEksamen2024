// Kilde: https://chatgpt.com/  (Beholder og skriver kommentarer for læring og hva koden gjør)

import { Context } from 'hono';
import db from '../database';

export const createComment = async (c: Context) => {
  const { lesson_slug, created_by, comment } = await c.req.json();
  const info = db.prepare('INSERT INTO Comments (lesson_slug, created_by, comment) VALUES (?, ?, ?)').run(lesson_slug, created_by, comment);
  return c.json({ id: info.lastInsertRowid, lesson_slug, created_by, comment });
};

