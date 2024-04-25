import joi from 'joi';

async function SignUpValidation(data) {
  const schema = joi.object({
    firstName: joi.string().min(3).required().label('firstName'),
    lastName: joi.string().min(3).required().label('lastName'),
    email: joi.string().email().label('email'),
    phoneNumber: joi.number().required().label('phoneNumber'),
    password: joi.string().min(8).required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).label('password'),
  });

  return await schema.validate(data, {
    abortEarly: false,
  });
}

export default SignUpValidation;
