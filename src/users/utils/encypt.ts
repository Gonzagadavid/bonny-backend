import * as bcrypt from 'bcrypt';

export const encrypt = (word: string) => {
  return bcrypt.hash(word, +(process.env.SALT ?? ''));
};
