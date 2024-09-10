import jwt, { SignOptions } from 'jsonwebtoken'
import 'dotenv/config'

export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey?: string // Do đã gán giá trị mặc định nên ta để option
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      // Nếu token != string hoặc lỗi khác thì reject luôn
      if (error) {
        return reject(error)
      }
      resolve(token as string)
    })
  })
}

export const verifyToken = ({
  token,
  privateKey = process.env.JWT_SECRET as string
}: {
  token: string
  privateKey?: string
}) => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, privateKey, (error, decoded) => {
      if (error) {
        throw reject(error)
      }
      resolve(decoded as jwt.JwtPayload)
    })
  })
}
