import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Game(props) {
  let navigate = useNavigate();
  const onClickhandler = (url, e) => {
    e.preventDefault();
    navigate(url);
  };
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl">
      <img src={props.src} className="mx-auto mt-8 h-16 w-16 text-green-400" viewBox="0 0 20 20" fill="currentColor" alt="" />
      <h1 className="mt-2 text-center text-2xl font-bold text-gray-500">{props.title}</h1>
      <p className="my-4 text-center text-sm text-gray-500">{props.subs}</p>
      <div className="space-x-4 bg-gray-100 py-4 text-center sm:py-2">
        <button
          onClick={e => {
            onClickhandler(props.start, e);
          }}
          className="inline-block rounded-md bg-green-500 px-10 py-2 font-semibold text-white shadow-md duration-75 hover:bg-green-700"
        >
          시작
        </button>
        <button
          onClick={e => {
            onClickhandler(props.description, e);
          }}
          className="inline-block rounded-md bg-blue-500 px-6 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-blue-700"
        >
          설명보기
        </button>
      </div>
    </div>
  );
}
