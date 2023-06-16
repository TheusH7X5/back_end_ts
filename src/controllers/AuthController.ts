import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/Users';

class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const verifyPass = await bcrypt.compare(password, user.password);

      if (!verifyPass) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const token = jwt.sign({ id: user.id }, 'secret_key', {
        expiresIn: '1h',
      });

      return res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to login.' });
    }
  }
}

export default new AuthController();
