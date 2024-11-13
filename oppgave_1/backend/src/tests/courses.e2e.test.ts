// Kilde: https://chatgpt.com/  (Beholder og skriver kommentarer for læring og hva koden gjør)

// Testfil som skal brukes for å teste backend-API'et direkte, en ende-til-ende-test
// Her kan vi teste om CRUD-operasjonene fungerer.. 

// Her tester vi for opprettelsen, hentingen og slettingen av et kurs:

import { test, expect } from '@playwright/test';

test.describe('Course CRUD Endpoints', () => {
  let courseId: number;

  // Test for å opprette et nytt kurs
  test('should create a new course', async ({ request }) => {
    const response = await request.post('http://localhost:4001/courses', { // Bruker full URL
      data: {
        title: 'Playwright Test Course',
        category: 'Testing',
      },
    });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    courseId = responseBody.id;
    expect(responseBody.title).toBe('Playwright Test Course');
    expect(responseBody.category).toBe('Testing');
  });

  // Test for å hente alle kurs
  test('should fetch all courses', async ({ request }) => {
    const response = await request.get('http://localhost:4001/courses'); // Bruker full URL
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(Array.isArray(responseBody.data)).toBeTruthy();
    expect(responseBody.data.length).toBeGreaterThan(0);
  });

  // Test for å slette et kurs
  test('should delete a course', async ({ request }) => {
    const response = await request.delete(`http://localhost:4001/courses/${courseId}`); // Bruker full URL
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.message).toBe(`Course ${courseId} deleted`);
  });
});
