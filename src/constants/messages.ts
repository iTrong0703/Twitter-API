export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Lỗi xác thực',
  NAME_IS_REQUIRED: 'Tên không được để trống',
  NAME_MUST_BE_A_STRING: 'Tên phải là một chuỗi kí tự',
  NAME_LENGTH: 'Tên phải có độ dài từ 3 đến 50 ký tự',
  NAME_ONLY_LETTERS_AND_SPACES: 'Tên chỉ được chứa chữ cái và khoảng trắng',
  EMAIL_IS_REQUIRED: 'Email không được để trống',
  EMAIL_INVALID: 'Email không hợp lệ',
  EMAIL_ALREADY_USED: 'Email đã được sử dụng',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Ngày sinh phải theo định dạng ISO 8601',
  PASSWORD_IS_REQUIRED: 'Mật khẩu không được để trống',
  PASSWORD_MUST_BE_A_STRING: 'Mật khẩu phải là một chuỗi kí tự',
  PASSWORD_LENGTH: 'Mật khẩu phải có độ dài từ 8 đến 64 ký tự',
  PASSWORD_STRENGTH:
    'Mật khẩu cần có ít nhất 8 ký tự, bao gồm chữ cái viết hoa, chữ cái viết thường, số và ký tự đặc biệt',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Xác nhận mật khẩu không được để trống',
  CONFIRM_PASSWORD_LENGTH: 'Xác nhận mật khẩu phải có độ dài từ 8 đến 64 ký tự',
  CONFIRM_PASSWORD_NOT_MATCH: 'Mật khẩu xác nhận không khớp',
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  REGISTER_SUCCESS: 'Đăng ký thành công',
  INVALID_EMAIL_OR_PASSWORD: 'Email hoặc mật khẩu không hợp lệ',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required'
} as const
