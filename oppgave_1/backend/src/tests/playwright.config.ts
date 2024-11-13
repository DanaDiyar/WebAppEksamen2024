// Kilde: https://chatgpt.com/  (Beholder og skriver kommentarer for læring og hva koden gjør)

// Konfigurasoner for test med playwright

import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  use: {
    baseURL: 'http://localhost:4001', // Porten hvor backend-serveren kjører
  },
});
