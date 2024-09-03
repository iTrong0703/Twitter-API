import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { RegisterRequestBody } from '~/models/requests/User.requests'

class UsersService {
  async register(payload: RegisterRequestBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload, // Sao chép tất cả các thuộc tính từ payload vào đối tượng User
        date_of_birth: new Date(payload.date_of_birth)
      })
    )
    return result
  }

  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email: email })
    // Nếu email đã được sử dụng
    if (user) {
      throw new Error('Email đã được sử dụng')
    }
    return true
  }
}

const usersService = new UsersService()
export default usersService
