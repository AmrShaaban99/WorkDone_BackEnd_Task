import * as bcrypt from 'bcrypt';

const HASH_SALT_ROUNDS =12

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(HASH_SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
};