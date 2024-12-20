import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { documentRoutes } from './routes/documents';
import { chatRoutes } from './routes/chat';
import { authRoutes } from './routes/auth';
import { errorHandler } from './middleware/errorHandler';
import { authenticate } from './middleware/authenticate';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/documents', authenticate, documentRoutes);
app.use('/api/chat', authenticate, chatRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});