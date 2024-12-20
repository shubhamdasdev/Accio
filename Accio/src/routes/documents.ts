import { Router } from 'express';
import { body } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();
const prisma = new PrismaClient();

// Get all documents
router.get('/', async (req, res) => {
  const documents = await prisma.document.findMany({
    where: { userId: req.user.id },
    orderBy: { date: 'desc' },
  });
  res.json(documents);
});

// Create document
router.post(
  '/',
  [
    body('name').notEmpty().trim(),
    body('type').notEmpty().trim(),
    body('investmentRisks').optional().trim(),
    body('marketConsiderations').optional().trim(),
  ],
  validateRequest,
  async (req, res) => {
    const document = await prisma.document.create({
      data: {
        ...req.body,
        userId: req.user.id,
        date: new Date(),
      },
    });
    res.status(201).json(document);
  }
);

// Update document
router.put(
  '/:id',
  [
    body('name').optional().trim(),
    body('type').optional().trim(),
    body('investmentRisks').optional().trim(),
    body('marketConsiderations').optional().trim(),
  ],
  validateRequest,
  async (req, res) => {
    const document = await prisma.document.update({
      where: { 
        id: req.params.id,
        userId: req.user.id,
      },
      data: req.body,
    });
    res.json(document);
  }
);

// Delete document
router.delete('/:id', async (req, res) => {
  await prisma.document.delete({
    where: { 
      id: req.params.id,
      userId: req.user.id,
    },
  });
  res.status(204).send();
});

export const documentRoutes = router;