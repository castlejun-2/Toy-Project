/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

export default function Header() {
  const header_style = {
    cursor: 'pointer',
    width: '200px',
    margin: '0 auto',
    display: 'block',
  };
  return (
    <header>
      <img
        style={header_style}
        src="https://ufwo.s3.ap-northeast-2.amazonaws.com/RPS_LOGO128.png"
        href="https://ufwo.s3.ap-northeast-2.amazonaws.com/RPS_LOGO64.png"
      ></img>
    </header>
  );
}
