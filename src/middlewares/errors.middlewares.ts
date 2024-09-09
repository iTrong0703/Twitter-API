import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Nếu không có status lỗi, thì ta cho mặc định nó là 500. omit() bỏ đi status
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(err, 'status'))
}
