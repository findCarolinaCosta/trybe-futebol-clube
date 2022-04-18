import * as Joi from 'joi';
import { IError } from '../interfaces/errorInterface';

export default function validateSchema<T>(
  obj: T,
  schema: Joi.ObjectSchema<T>, // valor padrão de T = any na interface ObjectSchema
): IError | void {
  const { error }: { error: Joi.ValidationError | undefined } = schema.validate(obj);
  if (error?.message) {
    const [code, message]: Array<string> = error.message.split('|');
    const err: IError = { status: code, message };
    return err;
  }
}
