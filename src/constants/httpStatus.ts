const HTTP_STATUS = {
  OK: 200, // yêu cầu đã được xử lý thành công.
  CREATED: 201, // tài nguyên đã được tạo thành công.
  ACCEPTED: 202, //  yêu cầu đã được chấp nhận, nhưng chưa xử lý xong.
  NO_CONTENT: 204, // yêu cầu đã thành công, nhưng không có nội dung trả về.
  BAD_REQUEST: 400, //yêu cầu không hợp lệ.
  UNAUTHORIZED: 401, // người dùng chưa được xác thực.
  FORBIDDEN: 403, // đã xác thực nhưng không có quyền truy cập vào tài nguyên.
  NOT_FOUND: 404, // tài nguyên yêu cầu không được tìm thấy.
  CONFLICT: 409, // xung đột trong yêu cầu, ví dụ dữ liệu đã tồn tại.
  TOO_MANY_REQUESTS: 429, // gửi quá nhiều yêu cầu trong thời gian ngắn
  UNPROCESSABLE_ENTITY: 422, // yêu cầu hợp lệ nhưng không thể xử lý được
  INTERNAL_SERVER_ERROR: 500 //lỗi máy chủ nội bộ
} as const

export default HTTP_STATUS
