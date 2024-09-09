import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { RegisterRequestBody } from '~/models/requests/User.requests'
import { hashPassword } from '~/utils/hash'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'
import { ErrorWithStatus } from '~/models/Errors'

class UsersService {
  // Tạo access token
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }
  // Tạo refresh token
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }
  async register(payload: RegisterRequestBody) {
    // Hash password trước khi đưa vào db
    const hashedPassword = await hashPassword(payload.password)
    const result = await databaseService.users.insertOne(
      new User({
        ...payload, // Sao chép tất cả các thuộc tính từ payload vào đối tượng User
        date_of_birth: new Date(payload.date_of_birth),
        password: hashedPassword
      })
    )
    const user_id = result.insertedId.toString()
    const [acces_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    return {
      acces_token,
      refresh_token
    }
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
