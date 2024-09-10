import bcrypt from 'bcrypt'
import 'dotenv/config'

// Hàm để hash mật khẩu
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = Number(process.env.SALT_ROUNDS) // Số vòng lặp hash
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}
