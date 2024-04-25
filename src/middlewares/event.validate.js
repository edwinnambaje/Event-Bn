import eventValidation from '../validations/event.validation';

export default async function eventValidate(req, res, next) {
  const { body } = req;
  const { error } = eventValidation(body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(' ');
    return res.status(400).json({ status: 'fail', message: errorMessage });
  }
  next();
}
