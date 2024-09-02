import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: 'Tên không được để trống'
      },
      isString: {
        errorMessage: 'Tên phải là một chuỗi kí tự'
      },
      isLength: {
        options: {
          min: 3,
          max: 50
        },
        errorMessage: 'Tên phải có độ dài từ 3 đến 50 ký tự'
      },
      matches: {
        options: /^[A-Za-z\s]+$/, // Chỉ cho phép các chữ cái và khoảng trắng
        errorMessage: 'Tên chỉ được chứa chữ cái và khoảng trắng'
      },
      trim: true
    },
    email: {
      notEmpty: {
        errorMessage: 'Email không được để trống'
      },
      isEmail: {
        errorMessage: 'Email không hợp lệ'
      },
      trim: true
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    },
    password: {
      notEmpty: {
        errorMessage: 'Mật khẩu không được để trống'
      },
      isString: {
        errorMessage: 'Mật khẩu phải là một chuỗi kí tự'
      },
      isLength: {
        options: {
          min: 8,
          max: 64
        },
        errorMessage: 'Mật khẩu phải có độ dài từ 8 đến 64 ký tự'
      },
      isStrongPassword: {
        options: {
          minLength: 8, // Độ dài tối thiểu của mật khẩu
          minLowercase: 1, // Số lượng ký tự chữ cái viết thường tối thiểu
          minUppercase: 1, // Số lượng ký tự chữ cái viết hoa tối thiểu
          minNumbers: 1, // Số lượng ký tự số tối thiểu
          minSymbols: 1 // Số lượng ký tự đặc biệt tối thiểu
        },
        errorMessage:
          'Mật khẩu cần có ít nhất 8 ký tự, bao gồm chữ cái viết hoa, chữ cái viết thường, số và ký tự đặc biệt'
      }
    },
    confirm_password: {
      notEmpty: {
        errorMessage: 'Xác nhận mật khẩu không được để trống'
      },
      isLength: {
        options: {
          min: 8,
          max: 64
        },
        errorMessage: 'Xác nhận mật khẩu phải có độ dài từ 8 đến 64 ký tự'
      },
      custom: {
        options: (value, { req }) => value === req.body.password,
        errorMessage: 'Mật khẩu xác nhận không khớp'
      }
    }
  })
)
