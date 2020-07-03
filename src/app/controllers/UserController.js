import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

import User from '../schemas/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      fullname: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      }
      user.hash_password = undefined;
      return res.json(user);
    });
  }
}

export default new UserController();
