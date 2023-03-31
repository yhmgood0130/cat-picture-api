import pool from '../db/dbconnector';
import { generateJWT, hashPassword, comparePassword } from '../utils/auth';
import { createUser, getUserByEmail } from '../db/queries';

class LoginController {
  public async login(req, res) {
    try {
      const client = await pool.connect();
      const { email, password } = req.body;
      const { rows }  = await client.query(getUserByEmail, [email]);
      const [ user ] = rows;

      if (!user) throw new Error('Incorrect email or password');

      const validUser = await comparePassword(password, user);
      const token = await generateJWT(validUser);

      res.json({ token });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  public async createUser(req, res) {
    try {
      const client = await pool.connect();
      const  { rows : user } = await client.query("SELECT * from cat_users WHERE email = $1", [req.body.email]);

      if (user.length === 0) {
        const body = await hashPassword(req.body);
        const { first_name, last_name, email, password } = body;
        const { rows }  = await client.query(createUser, [first_name, last_name, email, password]);
        const [ newUser ] = rows;

        const token = await generateJWT(newUser);

        client.release();

        res.json({ token, user_id: newUser.user_id });
      } else {
        throw new Error('Email already in use');
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}


export default LoginController;
