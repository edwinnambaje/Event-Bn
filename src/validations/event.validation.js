import Joi from 'joi';

export default function eventValidation(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(1).required(),
    date: Joi.date().min('now').required(),
    location: Joi.string().min(1).required(),
    availableTickets: Joi.number().integer().min(0).required(),
    time: Joi.string().required(),
    price: Joi.number().precision(2).min(0).required(),
    image: Joi.string().uri(),
  });
  return schema.validate(data, {
    abortEarly: false,
  });
}
