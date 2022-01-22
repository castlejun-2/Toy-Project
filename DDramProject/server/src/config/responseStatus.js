class response {
  SUCCESS = { success: true };
  EMAIL_EMPTY = { success: false, message: 'Email을 입력해주세요.' };
  PASSWD_EMPTY = { success: false, message: 'Password를 입력해주세요.' };
  PASSWDCONFIRM_EMPTY = { success: false, message: 'Password Confirm를 입력해주세요.' };
  NAME_EMPTY = { success: false, message: 'Name를 입력해주세요.' };
  UNIVERSITY_EMPTY = { success: false, message: 'University를 입력해주세요.' };
  PHONENUMBER_EMPTY = { success: false, message: 'Phone Number를 입력해주세요.' };
  PASSWORD_IS_WRONG = { success: false, message: 'password가 일치하지 않습니다.' };
  EMAIL_FORM_IS_WRONG = { success: false, message: 'Email 형식이 옳바르지 않습니다.' };
  PHONENUMBER_FORM_IS_WRONG = { success: false, message: 'Phone Number 형식이 옳바르지 않습니다.' };
  EMAIL_NOT_EXIST = { success: false, message: '존재하지 않는 Email 입니다.' };
  EMAIL_IS_EXIST = { success: false, message: '이미 존재하는 Email 입니다.' };

  DB_ERROR = { success: false, message: 'Database Server Connect Error' };
}

export default new response();
