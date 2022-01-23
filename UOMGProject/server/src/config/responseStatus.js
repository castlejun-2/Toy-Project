class response {
  SUCCESS = { success: true };
  EMAIL_EMPTY = { success: false, message: '이메일을 입력해주세요.' };
  PASSWD_EMPTY = { success: false, message: '비밀번호를 입력해주세요.' };
  PASSWDCONFIRM_EMPTY = { success: false, message: '비밀번호 확인을 입력해주세요.' };
  NAME_EMPTY = { success: false, message: '이름을 입력해주세요.' };
  SCHOOL_EMPTY = { success: false, message: '학교를 입력해주세요.' };
  PHONENUMBER_EMPTY = { success: false, message: '핸드폰 번호를 입력해주세요.' };
  PASSWORD_IS_WRONG = { success: false, message: '비밀번호가 일치하지 않습니다.' };
  EMAIL_FORM_IS_WRONG = { success: false, message: '이메일 형식이 옳바르지 않습니다.' };
  PHONENUMBER_FORM_IS_WRONG = { success: false, message: '핸드폰 번호 형식이 옳바르지 않습니다.' };
  EMAIL_NOT_EXIST = { success: false, message: '존재하지 않는 이메일 입니다.' };
  EMAIL_IS_EXIST = { success: false, message: '이미 존재하는 이메일 입니다.' };
  AGREE_IS_EMPTY = { success: false, message: '<b>이용약관</b>에 동의해 주세요.' };

  DB_ERROR = { success: false, message: 'Database Server Connect Error' };
}

export default new response();
