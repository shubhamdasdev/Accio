import { Router } from 'express';
import { body } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();
const prisma = new PrismaClient();

// Get chat history
router.get('/', async (req, res) => {
  const chats = await prisma.chat.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'asc' },
  });
  res.json(chats);
});

// Send message
router.post(
  '/',
  [body('message').notEmpty().trim()],
  validateRequest,
  async (req, res) => {
    // Save user message
    const userMessage = await prisma.chat.create({
      data: {
        message: req.body.message,
        role: 'user',
        userId: req.user.id,
      },
    });

    // TODO: Integrate with AI service for response
    const aiResponse = "I'll analyze the documents and provide insights.";

    // Save AI response
    const assistantMessage = await prisma.chat.create({
      data: {
        message: aiResponse,
        role: 'assistant',
        userId: req.user.id,
      },
    });

    res.status(201).json([userMessage, assistantMessage]);
  }
);

export const chatRoutes = router;