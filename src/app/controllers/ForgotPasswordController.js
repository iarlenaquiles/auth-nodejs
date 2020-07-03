import crypto from 'crypto';
import async from 'async';
import Queue from '../../lib/Queue';
import User from '../schemas/User';
import RecoveryPasswordMail from '../jobs/RecoveryPasswordMail';

class ForgotPasswordController {
  async store(req, res) {
    const { email } = req.body;

    async.waterfall(
      [
        done => {
          User.findOne({ email }).exec((err, user) => {
            if (user) {
              done(err, user);
            } else {
              done('User not found');
            }
          });
        },
        (user, done) => {
          crypto.randomBytes(20, (err, buffer) => {
            const token = buffer.toString('hex');
            done(err, user, token);
          });
        },
        (user, token, done) => {
          User.findByIdAndUpdate(
            { _id: user._id },
            {
              reset_password_token: token,
              reset_password_expires: Date.now() + 86400000,
            },
            { upsert: true, new: true }
          ).exec((err, newUser) => {
            done(err, token, newUser);
          });
        },
        (token, user, done) => {
          Queue.add(RecoveryPasswordMail.key, {
            user,
            token,
          })
            .then(response => res.json({ message: 'Check your email box' }))
            .catch(err => done(err));
        },
      ],
      err => {
        return res.status(422).json({ message: err });
      }
    );
  }
}

export default new ForgotPasswordController();
