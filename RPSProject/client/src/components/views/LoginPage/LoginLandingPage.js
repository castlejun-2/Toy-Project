import React, { useState } from 'react';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import Login from './LoginPage.js';
import Register from './RegisterPage.js';

export default function LoginLandingPage() {
  const [On, setOn] = useState('loginid');
  const getOnPage = e => {
    setOn(e.currentTarget.id);
    if (e.currentTarget.id === 'register') {
      const login = document.getElementById('loginid');
      login.className = 'menu_id';
      login.setAttribute('aria-selected', 'false');
      e.currentTarget.className = 'menu_register on';
      e.currentTarget.setAttribute('aria-selected', 'true');
    } else {
      const register = document.getElementById('register');
      register.className = 'menu_register';
      register.setAttribute('aria-selected', 'false');
      e.currentTarget.className = 'menu_id on';
      e.currentTarget.setAttribute('aria-selected', 'true');
    }
  };
  return (
    <>
      <Header />
      <div className="content">
        <div className="login_wrap">
          <ul className="menu_wrap" role="tablist">
            <li className="menu_item" role="presentation">
              <a id="loginid" className="menu_id on" onClick={getOnPage} href="#none" role="tab" aria-selected="true">
                <span className="menu_text">
                  <span className="text">로그인</span>
                </span>
              </a>
            </li>
            <li className="menu_item" role="presentation">
              {/* <!--탭 메뉴 활성화시 className에 "on" 추가. 탭 선택시 aria-selected true--> */}
              <a id="register" className="menu_register" onClick={getOnPage} href="#none" role="tab" aria-selected="false">
                <span className="menu_text">
                  <span className="text">회원가입</span>
                </span>
              </a>
            </li>
          </ul>
          {On === 'loginid' ? <Login /> : <Register />}
        </div>
      </div>
      <Footer />
    </>
  );
}
