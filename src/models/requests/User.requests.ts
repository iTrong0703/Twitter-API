import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'

export interface LoginRequestBody {
  email: string
  password: string
}

export interface RegisterRequestBody {
  name: string
  email: string
  date_of_birth: string
  password: string
  confirm_password: string
}

export interface LogoutRequestBody {
  refresh_token: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
}

export interface VerifyEmailRequestBody {
  email_verify_token: string
}
