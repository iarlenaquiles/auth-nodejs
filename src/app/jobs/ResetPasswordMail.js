import Mail from '../../lib/Mail';

class ResetPasswordMail {
  get key() {
    return 'ResetPasswordMail';
  }

  async handle({ data }) {
    const { user, token } = data;

    await Mail.sendMail({
      to: `${user.fullname} <${user.email}>`,
      subjet: 'Tecla T - Confirmação recuperação de senha',
      template: 'resetpassword',
      context: {
        user: user.fullname,
      },
    });
  }
}

export default new ResetPasswordMail();
