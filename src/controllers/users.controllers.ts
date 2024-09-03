import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterRequestBody } from '~/models/requests/User.requests'
import usersService from '~/services/users.services'

// Do req, res yêu cầu kiểu dữ liệu, nên ta phải import chứ k đc để any
export const registerController = async (req: Request<ParamsDictionary, any, RegisterRequestBody>, res: Response) => {
  try {
    const result = await usersService.register(req.body)
    return res.json({
      message: `Đăng ký thành công!!! Chào mừng ${req.body.email}`,
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Đăng ký thất bại!!!',
      error
    })
  }
}
