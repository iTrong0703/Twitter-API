import { Request, Response } from 'express'
import usersService from '~/services/users.services'

// Do req, res yêu cầu kiểu dữ liệu, nên ta phải import chứ k đc để any
export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await usersService.register({ email, password })
    return res.json({
      message: `Đăng ký thành công!!! Chào mừng ${email}`,
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Đăng ký thất bại!!!',
      error
    })
  }
}
