import React from 'react';
import Search from './Search';
import Users from './Users';

function Left() {
  return (
    <div className="w-[30%] bg-black text-gray-300">
      <div className="font-bold text-3xl p-1 px-5">Chat</div>
      <Search></Search>
      <hr />
      <Users></Users>
    </div>
  );
}

export default Left;
