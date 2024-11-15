// Kilde: https://chatgpt.com/  (Beholder og skriver kommentarer for læring og hva koden gjør)

// Oppretter separerte filer (controllers & routes) og mapper i backend for å bryte ut CRUD-operasjonene i separerte filer 
// pga. oversikt og organiseering. Dette er serlig viktig i større prosjekter

// I controllers-mappen skal jeg ha logikk 

import { Context } from 'hono';
import db from '../database';

export const getCourses = (c: Context) => {
  const courses = db.prepare('SELECT * FROM Courses').all();
  return c.json({ data: courses });
};

export const createCourse = async (c: Context) => {
  const { title, category, slug, description } = await c.req.json();
  const info = db.prepare('INSERT INTO Courses (title, category, slug, description) VALUES (?, ?, ?, ?)').run(title, category, slug, description);
  return c.json({ id: info.lastInsertRowid, title, category, slug, description });
};


export const deleteCourse = (c: Context) => {
  const id = Number(c.req.param('id'));
  db.prepare('DELETE FROM Courses WHERE id = ?').run(id);
  return c.json({ message: `Course ${id} deleted` });
};
