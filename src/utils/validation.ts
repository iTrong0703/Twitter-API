import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'

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
    res.status(400).json({ errors: errors.mapped() })
  }
}
