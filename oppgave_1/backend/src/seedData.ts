import db from './database';
// @ts-ignore
import { courses, users, comments } from '../../frontend/src/data/data';

function seedUsers() {
  const insertUser = db.prepare('INSERT INTO Users (id, username, email) VALUES (?, ?, ?)');
  for (const user of users) {
    insertUser.run(user.id, user.name, user.email);
  }
  console.log('Brukere er lagt inn i databasen.');
}

function seedCoursesAndLessons() {
  const insertCourse = db.prepare('INSERT INTO Courses (id, title, category) VALUES (?, ?, ?)');
  const insertLesson = db.prepare('INSERT INTO Lessons (id, courseId, title, content) VALUES (?, ?, ?, ?)');

  for (const course of courses) {
    // Sett inn kurset først
    insertCourse.run(course.id, course.title, course.category);

    // Sett inn leksjonene knyttet til dette kurset
    for (const lesson of course.lessons) {
      // Kombinerer preAmble og tekst i content
      const content = `${lesson.preAmble}\n${lesson.text.map(t => t.text).join('\n')}`;
      insertLesson.run(lesson.id, course.id, lesson.title, content);
    }
  }

  console.log('Kurs og tilknyttede leksjoner er lagt inn i databasen.');
}

function seedComments() {
  const insertComment = db.prepare('INSERT INTO Comments (id, lessonId, content) VALUES (?, ?, ?)');

  for (const comment of comments) {
    // Finn riktig lessonId ved å søke etter `slug` i leksjonene
    const lesson = courses
      .flatMap(course => course.lessons)
      .find(lesson => lesson.slug === comment.lesson.slug);

    if (lesson) {
      insertComment.run(comment.id, lesson.id, comment.comment);
    }
  }

  console.log('Kommentarer er lagt inn i databasen.');
}

// Kjør seed-funksjonene
seedUsers();
seedCoursesAndLessons();
seedComments();
console.log('Dummy-data er lagt inn.');
