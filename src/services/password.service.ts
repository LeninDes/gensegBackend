import bcrypt from 'bcrypt';
const SALT_ROUNDS: number = 10;

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

// Leer y comparar con el hash de la base de datos
