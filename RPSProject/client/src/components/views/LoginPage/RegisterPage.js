import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [Nickname, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [PasswordConfirm, setPasswordConfirm] = useState('');

  const onEmailHandler = e => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value);
  };
  const onPasswordConfirmHandler = e => {
    setPasswordConfirm(e.currentTarget.value);
  };
  const onSubmitHandler = e => {
    e.preventDefault();

    if (Password !== PasswordConfirm) {
      return alert('비밀번호와 비밀번호 확인은 같아야합니다.');
    }
    const body = {
      nickname: Nickname,
      password: Password,
      passwordConfirm: PasswordConfirm,
    };

    dispatch(registerUser(body)).then(response => {
      if (response.payload.success) {
        alert(response.payload.message);
        navigate('/users/login');
      } else {
        alert(response.payload.message);
      }
    });
  };

  return (
    <form id="frmIdLogin" target="_top" autoComplete="off" method="POST" onSubmit={onSubmitHandler}>
      <ul className="panel_wrap">
        <li className="panel_item">
          <div className="panel_inner" role="tabpanel" aria-controls="loginid">
            <div className="id_pw_wrap">
              <div className="input_row" id="id_line">
                <input
                  type="text"
                  id="id"
                  name="id"
                  placeholder="닉네임"
                  value={Nickname}
                  onChange={onEmailHandler}
                  title="닉네임"
                  className="input_text"
                  maxLength="20"
                />
              </div>
              <div className="input_row" id="pw_line">
                <input
                  type="password"
                  id="pw"
                  name="pw"
                  placeholder="비밀번호"
                  value={Password}
                  onChange={onPasswordHandler}
                  title="비밀번호"
                  className="input_text"
                  maxLength="16"
                />
              </div>
              <div className="input_row" id="pwConfirm_line">
                <input
                  type="password"
                  id="pwConfirm"
                  name="pwConfirm"
                  placeholder="비밀번호 확인"
                  value={PasswordConfirm}
                  onChange={onPasswordConfirmHandler}
                  title="비밀번호 확인"
                  className="input_text"
                  maxLength="16"
                />
              </div>
            </div>
            <div className="btn_login_wrap">
              <button type="submit" className="btn_login" id="log.login">
                <span className="btn_text">가입완료</span>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </form>
  );
}
