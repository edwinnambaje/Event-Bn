import joi from 'joi';

async function PasswordValidation(data) {
  const schema = joi.object({
    password: joi
      .string()
      .min(8)
      .required()
      .pattern(
        new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
        ),
      )
      .label('password'),
  });

  return await schema.validate(data, {
    abortEarly: false,
  });
}
export default PasswordValidation;
