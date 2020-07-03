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

  async update(req, res) {
    const schema = Yup.object().shape({
      fullname: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { fullname, email } = req.body;

    User.findByIdAndUpdate({ _id: id }, { fullname, email }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'user does not updated' });
      }
      return res.status(201).json({ message: 'User updated' });
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    User.deleteOne({ _id: id }, function(err) {
      if (err) return res.status(500).json({ message: 'User doesnot deleted' });

      return res.status(200).json({ message: 'User deleted' });
    });
  }
}

export default new UserController();
