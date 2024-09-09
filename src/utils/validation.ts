import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'

export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Truyền request vào để tiến hành validate
    await validation.run(req)

    // nếu có lỗi nó sẽ trả về lỗi vào biến req luôn nên ta lấy lỗi từ biến req thông qua validationResult()
    const errors = validationResult(req)

    // Nếu không có lỗi return và kết thúc
    if (errors.isEmpty()) {
      return next()
    }

    // Dùng mapped() để gộp các lỗi trong cùng 1 trường vào
    const errorsObject = errors.mapped()

    // Tạo obj rỗng để nếu xảy ra lỗi 422 thì add nó vào
    const entityError = new EntityError({ errors: {} })

    // Lặp qua check status có != 422 không
    for (const key in errorsObject) {
      // Dùng Destructuring lấy ra msg
      const { msg } = errorsObject[key]
      // Trả về lỗi không phải 422
      if (msg instanceof ErrorWithStatus && msg.status != HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        // Nếu msg thuộc ErrorWithStatus thì sẽ chắc chắn có status và có kiểu ErrorWithStatus
        // Khi khác error 422, thì ta dồn nó qua hết bên middleware error handler mặc định của chúng ta
        return next(msg)
      }
      // Nếu là lỗi 422
      // Lặp qua và add các field có dạng ErrorsType vào
      entityError.errors[key] = errorsObject[key]
    }

    // Còn nếu là lỗi do 422 thì trả về đây
    next(entityError)
  }
}
