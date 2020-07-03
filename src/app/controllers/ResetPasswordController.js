import bcrypt from 'bcryptjs';
import Queue from '../../lib/Queue';
import User from '../schemas/User';
import ResetPasswordMail from '../jobs/ResetPasswordMail';

class ResetPasswordController {
  async store(req, res) {
    const { token, newPassword, verifyPassword } = req.body;

    User.findOne({
      reset_password_token: token,
      reset_password_expires: { $gt: Date.now() },
    }).exec((err, user) => {
      if (!err && user) {
        if (newPassword === verifyPassword) {
          user.hash_password = bcrypt.hashSync(newPassword, 10);
          user.reset_password_token = undefined;
          user.reset_password_expires = undefined;

          user.save(err => {
            if (err) {
              return res.status(422).send({
                message: err,
              });
            }

            Queue.add(ResetPasswordMail.key, {
              user,
            })
              .then(response => res.json({ message: 'Check your email box' }))
              .catch(err => done(err));
          });
        } else {
          return res.status(422).send({ messane: 'Passwords does not match' });
        }
      } else {
        return res
          .status(400)
          .send({ message: 'Password reset token is invalid or has expired' });
      }
    });
  }
}

export default new ResetPasswordController();
