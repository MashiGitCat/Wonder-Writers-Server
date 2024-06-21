// draftsRoutes.ts
import { Router, Request, Response } from 'express';
import Draft from '../models/drafts';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Save a new draft
router.post('/drafts', requireAuth, async (req: any, res: Response) => {
  try {
    const { title, author, imagePosition } = req.body;
    const newDraft = new Draft({
      userId: req.auth.userId,
      title,
      author,
      imagePosition,
    });
    await newDraft.save();
    res.status(201).json({ message: 'Draft saved successfully', draft: newDraft });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all drafts for the logged-in user
router.get('/drafts', requireAuth, async (req: any, res: Response) => {
  try {
    const drafts = await Draft.find({ userId: req.auth.userId });
    res.json(drafts);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
