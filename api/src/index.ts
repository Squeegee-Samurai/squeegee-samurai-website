import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { quoteRouter } from './quote.js';
import { testPdfRouter } from './testPdf.js';
import { contactRouter } from './contact.js';

const PORT = Number(process.env.PORT) || 3000;
const origins = (process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173').split(',').map((o) => o.trim());

const app = express();
app.use(cors({ origin: origins, credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'squeegee-samurai-api',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', quoteRouter);
app.use('/api', testPdfRouter);
app.use('/api', contactRouter);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
