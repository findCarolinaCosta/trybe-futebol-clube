import * as Joi from 'joi';

const filledFieldsMessage = '400|All fields must be filled'; // status code | message
const incorrectField = '401|Incorrect email or password'; // status code | message

export default Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': filledFieldsMessage,
    'string.empty': filledFieldsMessage,
    'string.email': incorrectField,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': filledFieldsMessage,
    'string.empty': filledFieldsMessage,
    'string.min': incorrectField,
  }),
});
