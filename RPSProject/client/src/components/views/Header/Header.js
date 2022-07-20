/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../../../App.css';

export default function Header() {
  const header_style = {
    cursor: 'pointer',
    width: '200px',
    margin: '0 auto',
    display: 'block',
  };
  return (
    <header>
      <img className="App-logo" style={header_style} src="https://toyrpsbucket.s3.ap-northeast-2.amazonaws.com/RPS_LOGO.png" href="/"></img>
    </header>
  );
}
