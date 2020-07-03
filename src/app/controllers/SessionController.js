import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import User from '../schemas/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, password } = req.body;

    User.findOne(
      {
        email,
      },
      (err, user) => {
        if (err) throw err;

        if (!user || !user.comparePassword(password)) {
          return res.status(401).json({
            message: 'Authentication failed. Invalid Credentials.',
          });
        }
        return res.json({
          user: { fullname: user.fullname, email: user.email },
          token: jwt.sign({ _id: user._id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
          }),
        });
      }
    );
  }
}

export default new SessionController();
