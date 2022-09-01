import React, { useEffect, useState, useRef } from 'react';
import $ from 'jquery';
import axios from 'axios';

function ReactionRate() {
  const objstyle = {
    margin: '0 auto',
  };
  const [time, setTime] = useState(5);
  const [game, setGame] = useState(false);

  useEffect(() => {
    time > 0 && setTimeout(() => setTime(time - 1), 1000);
  }, [time]);
  return (
    <>
      <div className="table w-full">
        <div id="count_down" className="container table-cell align-middle md:h-screen p-6 lg:h-screen">
          {time ? (
            <div className="max-w-xs bg-white shadow-lg rounded-lg text-center text-5xl font-bold h-screen md:h-min" style={objstyle}>
              {time === 3 ? (
                <p className="text-green-600 leading-[20rem]">{time}</p>
              ) : time === 2 ? (
                <p className="text-blue-600 leading-[20rem]">{time}</p>
              ) : time === 1 ? (
                <p className="text-red-600 leading-[20rem]">{time}</p>
              ) : (
                <p className="text-black leading-[20rem]">{time}</p>
              )}
            </div>
          ) : (
            <div className="p-3 max-w-3xl bg-white shadow-lg rounded-lg md:block lg:flex" style={objstyle}>
              <div className="bg-cover text-center bg-landscape">
                <img className="my-0 mx-auto" src="https://toyrpsbucket.s3.ap-northeast-2.amazonaws.com/RPS_LOGO.png" alt="" />
              </div>
              <form className="mt-6 self-center">
                <span className="w-1/2">
                  <label htmlFor="game-title" className="block text-xs font-semibold text-gray-600 uppercase">
                    이름
                  </label>
                  <input
                    id="game-title"
                    type="text"
                    name="game-title"
                    placeholder="내기 이름"
                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    required
                  />
                </span>
                <label htmlFor="speend" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                  반응 속도
                </label>
                <input
                  id="speend"
                  type="text"
                  name="speend"
                  placeholder="4.5 SEC"
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  readOnly
                />
                <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                  상위 %
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="상위 5%"
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  readOnly
                />
                <label htmlFor="password-confirm" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                  현재 순위
                </label>
                <input
                  id="password-confirm"
                  type="password"
                  name="password-confirm"
                  placeholder="1등 / 6명"
                  className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                  readOnly
                />
                <div className="flex justify-between gap-3">
                  <button
                    type="submit"
                    className="w-full py-3 mt-6 font-medium tracking-widest text-white bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
                  >
                    다음
                  </button>
                  <button
                    type="submit"
                    className="w-full py-3 mt-6 font-medium tracking-widest text-white bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
                  >
                    다시하기
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ReactionRate;
