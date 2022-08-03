import React from 'react';
import Game from './Game';

export default function GameList() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 bg-gray-100 px-4 sm:flex-row sm:space-x-6 sm:space-y-0">
      <Game
        title="반응속도 게임"
        subs="빠른 순발력을 요구하는 게임입니다."
        src="https://toyrpsbucket.s3.ap-northeast-2.amazonaws.com/RPS_click.png"
        start="/game/click"
        description="/game/description/click"
      />
      <Game
        title="사다리 타기"
        subs="좋은 자리선정을 요구하는 게임입니다."
        src="https://toyrpsbucket.s3.ap-northeast-2.amazonaws.com/RPS_ladder.png"
        start="/game/ladder"
        description="/game/description/ladder"
      />
      <Game
        title="주사위 게임"
        subs="높은 행운을 요구하는 게임입니다."
        src="https://toyrpsbucket.s3.ap-northeast-2.amazonaws.com/RPS_dice.png"
        start="/game/dice"
        description="/game/description/dice"
      />
    </div>
  );
}
