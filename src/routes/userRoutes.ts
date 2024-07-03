import { Router, Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, birthDate, country } = req.body;
    const newUser = new User({ username,
        email,
        password,
        birthDate,
        country });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: unknown) {  
    
    const message = (error as Error).message;  
    res.status(500).json({ message: 'Server error', error: message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: true, message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: (user._id as unknown as string).toString() },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );
    res.json({ message: 'Logged in successfully', token, username: user.username });
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message || 'Server error' });
  }
});
router.get('/protected', requireAuth, (req: any, res: Response) => {
  const userId = req.auth.userId; 
  res.json(`This is a protected route accessed by user ID: ${userId}`);
});
export default router;
