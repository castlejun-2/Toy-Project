import React, { useEffect } from 'react';
import axios from 'axios';
import GameComponent from './GameList/GameList.js';
import Profile from './Profile/Profile.js';

export default function LandingPage() {
  useEffect(() => {}, []);
  return (
    <>
      <div className="h-screen items-center justify-center bg-gray-100">
        {<Profile />}
        {<GameComponent />}
      </div>
    </>
  );
}
