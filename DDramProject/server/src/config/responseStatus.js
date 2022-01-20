class response {
  SUCCESS = { success: true };
  EMAIL_OR_PASSWD_EMPTY = { success: false, message: 'email 혹은 password를 입력해주세요.' };
  PASSWORD_IS_WRONG = { success: false, message: 'password가 일치하지 않습니다.' };
  EMAIL_NOT_EXIST = { success: false, message: '존재하지 않는 email 입니다.' };
}

export default new response();
