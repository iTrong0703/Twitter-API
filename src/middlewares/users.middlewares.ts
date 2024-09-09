import { checkSchema } from 'express-validator'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'
import { validate } from '~/utils/validation'

export const loginValidator = validate(
  checkSchema({
    email: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
      },
      isEmail: {
        errorMessage: USERS_MESSAGES.EMAIL_INVALID
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const user = await databaseService.users.findOne({ email: value })
          // Nếu k tìm thấy email = user chưa register
          if (user === null) {
            throw new Error(USERS_MESSAGES.USER_NOT_FOUND)
          }
          // Nếu tìm thấy email thì truyền user qua loginController bằng req
          req.user = user
          return true
        }
      }
    },
    password: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
      },
      isString: {
        errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 8,
          max: 64
        },
        errorMessage: USERS_MESSAGES.PASSWORD_LENGTH
      },
      isStrongPassword: {
        options: {
          minLength: 8, // Độ dài tối thiểu của mật khẩu
          minLowercase: 1, // Số lượng ký tự chữ cái viết thường tối thiểu
          minUppercase: 1, // Số lượng ký tự chữ cái viết hoa tối thiểu
          minNumbers: 1, // Số lượng ký tự số tối thiểu
          minSymbols: 1 // Số lượng ký tự đặc biệt tối thiểu
        },
        errorMessage: USERS_MESSAGES.PASSWORD_STRENGTH
      }
    }
  })
)

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED
      },
      isString: {
        errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 3,
          max: 50
        },
        errorMessage: USERS_MESSAGES.NAME_LENGTH
      },
      matches: {
        options: /^[A-Za-z\s]+$/, // Chỉ cho phép các chữ cái và khoảng trắng
        errorMessage: USERS_MESSAGES.NAME_ONLY_LETTERS_AND_SPACES
      },
      trim: true
    },
    email: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
      },
      isEmail: {
        errorMessage: USERS_MESSAGES.EMAIL_INVALID
      },
      trim: true,
      custom: {
        options: async (value) => {
          const isEmailExist = await usersService.checkEmailExist(value)
          if (isEmailExist) {
            throw new Error(USERS_MESSAGES.EMAIL_ALREADY_USED)
          }
          return true
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        },
        errorMessage: USERS_MESSAGES.DATE_OF_BIRTH_MUST_BE_ISO8601
      }
    },
    password: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
      },
      isString: {
        errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 8,
          max: 64
        },
        errorMessage: USERS_MESSAGES.PASSWORD_LENGTH
      },
      isStrongPassword: {
        options: {
          minLength: 8, // Độ dài tối thiểu của mật khẩu
          minLowercase: 1, // Số lượng ký tự chữ cái viết thường tối thiểu
          minUppercase: 1, // Số lượng ký tự chữ cái viết hoa tối thiểu
          minNumbers: 1, // Số lượng ký tự số tối thiểu
          minSymbols: 1 // Số lượng ký tự đặc biệt tối thiểu
        },
        errorMessage: USERS_MESSAGES.PASSWORD_STRENGTH
      }
    },
    confirm_password: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED
      },
      isLength: {
        options: {
          min: 8,
          max: 64
        },
        errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_LENGTH
      },
      custom: {
        options: (value, { req }) => value === req.body.password,
        errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_NOT_MATCH
      }
    }
  })
)
