import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import salesRoutes from './routes/salesRoutes.js';
import { initializeData } from './services/salesService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Increase memory limit warning
if (process.env.NODE_OPTIONS && !process.env.NODE_OPTIONS.includes('--max-old-space-size')) {
  console.warn('Consider setting NODE_OPTIONS=--max-old-space-size=4096 for large datasets');
}

app.use(cors());
app.use(express.json());

app.use('/api/sales', salesRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Initialize data on startup
console.log('Initializing data...');
initializeData()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Data loaded and ready');
    });
  })
  .catch((error) => {
    console.error('Failed to initialize data:', error);
    console.log('Server starting anyway, data will load on first request');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
