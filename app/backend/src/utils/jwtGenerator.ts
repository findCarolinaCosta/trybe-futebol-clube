import * as jwt from 'jsonwebtoken';
import { readFile } from 'fs/promises';

const jwtConfig = {
  expiresIn: '1d',
};
const secret: Promise<Buffer> = readFile('jwt.evaluation.key');

export const createToken = async (data = {}): Promise<string> =>
  jwt.sign({ data }, await secret, jwtConfig);

export const validateToken = async (token: string): Promise<string | jwt.JwtPayload> =>
  jwt.verify(token, await secret);
