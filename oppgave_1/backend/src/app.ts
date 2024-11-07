// Kilde: https://chatgpt.com/

import { Hono } from "hono";
import { cors } from "hono/cors";
import db from "./database"; 

const app = new Hono();

app.use("/*", cors());

app.onError((err, c) => {
  console.error(err);
  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    { status: 500 }
  );
});

// Henter elementer fra database
app.get("/items", (c) => {
  const items = db.prepare("SELECT * FROM items").all();
  return c.json(items);
});

export default app;
