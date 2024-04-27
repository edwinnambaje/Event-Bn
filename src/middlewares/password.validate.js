import PasswordValidation from '../validations/password.validation';

export default async function passwordValidate(req, res, next) {
  const { body } = req;
  const { error } = await PasswordValidation(body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(' ');
    return res.status(400).json({ status: 'fail', message: errorMessage });
  }
  next();
}
