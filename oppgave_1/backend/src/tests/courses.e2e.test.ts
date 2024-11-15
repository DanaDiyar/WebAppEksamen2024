// Kilde: https://chatgpt.com/  (Beholder og skriver kommentarer for læring og hva koden gjør)

// Testfil som skal brukes for å teste backend-API'et direkte, en ende-til-ende-test
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
        slug: 'playwright-test-course',
        description: 'This is a test course created by Playwright.'
      },
    });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('Create response:', responseBody); // Debugging
    expect(responseBody).toHaveProperty('id');
    courseId = responseBody.id;
    expect(responseBody.title).toBe('Playwright Test Course');
    expect(responseBody.category).toBe('Testing');
    expect(responseBody.slug).toBe('playwright-test-course');
    expect(responseBody.description).toBe('This is a test course created by Playwright.');
  });

  // Test for å hente alle kurs
  test('should fetch all courses', async ({ request }) => {
    const response = await request.get('http://localhost:4001/courses');
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('Fetch response:', responseBody); // Debugging
    
    // Tilpasset strukturen etter responsen fra API
    if (Array.isArray(responseBody)) {
      expect(responseBody.length).toBeGreaterThan(0); // Hvis API-et returnerer en array direkte
    } else {
      expect(Array.isArray(responseBody.data)).toBeTruthy();
      expect(responseBody.data.length).toBeGreaterThan(0);
    }
  });

  // Test for å slette et kurs
  test('should delete a course', async ({ request }) => {
    const response = await request.delete(`http://localhost:4001/courses/${courseId}`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('Delete response:', responseBody); // Debugging

    // Bekreft responsen matcher slettemeldingen
    expect(responseBody.message).toBe(`Course ${courseId} deleted`);
  });
});
