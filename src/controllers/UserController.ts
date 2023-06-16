import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/Users';


class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashPassword,
      });

      const { password: _, ...user } = newUser.toJSON();

      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create user.' });
    }
  }
}

export default new UserController();
