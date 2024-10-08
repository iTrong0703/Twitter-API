import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Nếu nó là ErrorWithStatus hoặc EntityError thì dùng status code báo lỗi status bthng
  if (err instanceof ErrorWithStatus) {
    // Do EntityError kế thừa ErrorWithStatus nên nó cũng instanceof ErrorWithStatus
    // omit() bỏ đi status
    return res.status(err.status).json(omit(err, 'status'))
  }
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })
  // Nếu không có status lỗi, thì ta cho mặc định status là 500,
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    errorInfor: omit(err, 'stack')
  })
}
