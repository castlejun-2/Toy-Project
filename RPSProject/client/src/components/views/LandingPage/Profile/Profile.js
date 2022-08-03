import React from 'react';

export default function Profile(props) {
  return (
    <div className="container mx-auto pt-32 pb-4">
      <div>
        <div className="bg-white relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
          <div className="flex justify-center">
            <img
              src="https://toyrpsbucket.s3.ap-northeast-2.amazonaws.com/RPS_LOGO.png"
              alt=""
              className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
            />
          </div>

          <div className="mt-16">
            <h1 className="font-bold text-center text-3xl text-gray-900">이성준</h1>
            <p className="text-center text-sm text-gray-400 font-medium">골목대장</p>
            <p>
              <span></span>
            </p>
            <div className="my-5 px-6">
              <a
                href="#"
                className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white"
              >
                <span className="font-bold">죽을때까지 굴복하지 않는다.</span>
              </a>
            </div>
            <div className="flex justify-between items-center my-5 px-6">
              <a
                href={`${props.name}/group`}
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                그룹
              </a>
              <a
                href={`${props.name}/total-penalty`}
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                전체 벌칙
              </a>
              <a
                href={`${props.name}/average`}
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                평균 등수
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
