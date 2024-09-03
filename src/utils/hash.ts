import bcrypt from 'bcrypt'

// Hàm để hash mật khẩu
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10 // Số vòng lặp hash
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}
