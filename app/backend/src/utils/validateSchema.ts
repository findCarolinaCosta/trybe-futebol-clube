import * as Joi from 'joi';
import { IError } from '../interfaces/errorInterface';

export default function validateSchema<T>(
  obj: T,
  schema: Joi.ObjectSchema<T>, // valor padrão de T = any na interface ObjectSchema
): IError | void {
  const { error } = schema.validate(obj);
  if (error) {
    const [code, message] = error.message.split('|');
    const err = { status: code, message };
    return err;
  }
}
