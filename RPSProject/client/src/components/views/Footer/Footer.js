import React from 'react';

export default function Footer() {
  const footer_style = {
    textAlign: 'center',
    fontSize: '12px',
    marginTop: '10px',
    fontWeight: '550',
  };
  return (
    <footer style={footer_style}>
      <span>©RPS.</span>
    </footer>
  );
}
