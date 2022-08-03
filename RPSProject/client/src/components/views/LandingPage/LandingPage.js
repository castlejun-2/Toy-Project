import React, { useEffect } from 'react';
import axios from 'axios';
import GameComponent from './GameList/GameList.js';

export default function LandingPage() {
  useEffect(() => {}, []);
  return (
    <>
      <div>{<GameComponent />}</div>
    </>
  );
}
