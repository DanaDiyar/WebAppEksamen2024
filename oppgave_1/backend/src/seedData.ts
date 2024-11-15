// // Kilde: https://chatgpt.com/  (Beholder og skriver kommentarer for læring og hva koden gjør)

import db from './database';
// @ts-ignore
import { courses, users, comments } from '../../frontend/src/data/data';

function seedUsers() {
  db.exec('DELETE FROM Users'); // Tømmer tabellen først så det ikke blir dupliserte data når det kjøres flere ganger

  const insertUser = db.prepare('INSERT INTO Users (id, username, email) VALUES (?, ?, ?)');
  for (const user of users) {
    insertUser.run(user.id, user.name, user.email);
  }
  console.log('Brukere er lagt inn i databasen.');
}

function seedCoursesAndLessons() {
  db.exec('DELETE FROM Courses'); // Tøm tabellen først
  db.exec('DELETE FROM Lessons'); // Tøm tabellen først

  const insertCourse = db.prepare('INSERT INTO Courses (id, title, slug, description, category) VALUES (?, ?, ?, ?, ?)');
  const insertLesson = db.prepare('INSERT INTO Lessons (id, course_id, title, slug, description, text) VALUES (?, ?, ?, ?, ?, ?)');

  for (const course of courses) {
    // Sett inn kurset først med alle nødvendige felter
    insertCourse.run(course.id, course.title, course.slug, course.description, course.category);

    // Sett inn leksjonene knyttet til dette kurset med alle nødvendige felter
    for (const lesson of course.lessons) {
      const textContent = lesson.text.map(t => t.text).join('\n'); // Kombinerer tekstinnhold
      insertLesson.run(lesson.id, course.id, lesson.title, lesson.slug, lesson.preAmble, textContent);
    }
  }

  console.log('Kurs og tilknyttede leksjoner er lagt inn i databasen.');
}

function seedComments() {
  db.exec('DELETE FROM Comments'); // Tøm tabellen først

  const insertComment = db.prepare('INSERT INTO Comments (id, lesson_slug, created_by, comment) VALUES (?, ?, ?, ?)');

  for (const comment of comments) {
    // Finn riktig lesson_slug ved å bruke `slug` fra leksjonene
    const lesson = courses
      .flatMap(course => course.lessons)
      .find(lesson => lesson.slug === comment.lesson.slug);

    if (lesson) {
      insertComment.run(comment.id, lesson.slug, comment.createdBy.name, comment.comment);
    }
  }

  console.log('Kommentarer er lagt inn i databasen.');
}

// Kjør seed-funksjonene
seedUsers();
seedCoursesAndLessons();
seedComments();
console.log('Dummy-data er lagt inn.');
