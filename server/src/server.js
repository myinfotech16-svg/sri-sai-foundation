import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import { initSchema, pool } from './db.js';
import contactRoutes from './routes/contact.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;

// Railway sits behind a proxy; without this req.ip is always the proxy address
// and the rate limiter treats every visitor as the same person.
app.set('trust proxy', 1);

app.use(express.json({ limit: '100kb' }));

// In development the Vite dev server runs on a different port, so it needs CORS.
// In production the API and the site share an origin and this is a no-op.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()) || 'http://localhost:5173',
  })
);

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    return res.json({ ok: true, db: 'up' });
  } catch {
    return res.status(503).json({ ok: false, db: 'down' });
  }
});

app.use('/api', contactRoutes);

// Serve the built React app. `npm run build` in the project root writes to
// ../dist relative to this folder.
const distPath = path.resolve(__dirname, '../../dist');
app.use(express.static(distPath));

// React Router handles the routing, so any non-API path returns index.html.
app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

async function start() {
  try {
    await initSchema();
    console.log('Database ready.');
  } catch (err) {
    // Don't take the site down if only the database is unreachable — the pages
    // still render, and only the form will fail.
    console.error('Database init failed:', err.message);
  }

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

start();
