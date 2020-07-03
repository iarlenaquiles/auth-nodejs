import Mail from '../../lib/Mail';

class RecoveryPasswordMail {
  get key() {
    return 'RecoveryPasswordMail';
  }

  async handle({ data }) {
    const { user, token } = data;

    await Mail.sendMail({
      to: `${user.fullname} <${user.email}>`,
      subjet: 'Tecla T - Recuperação de senha',
      template: 'recoverypassword',
      context: {
        url: `http://localhost:3333/auth/reset_password?token=${token}`,
        user: user.fullname,
      },
    });
  }
}

export default new RecoveryPasswordMail();
