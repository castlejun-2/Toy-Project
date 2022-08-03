import React from 'react';
import Game from './Game';

export default function GameList() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6 bg-gray-100 px-4 sm:flex-row sm:space-x-6 sm:space-y-0">
      <Game title="반응속도" subs="반응속도 게임입니다" />
    </div>
  );
}
