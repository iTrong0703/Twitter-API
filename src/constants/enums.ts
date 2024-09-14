// Loại tài khoản
export enum UserVerifyStatus {
  Unverified, // Chưa xác thực email
  Verified, // Đã xác thực email
  Banned // Bị ban
}

// Loại token
export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}
