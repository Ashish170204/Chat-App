import React from 'react';
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Chatuser() {
  const { selectedConversation } = useConversation();
  // console.log(selectedConversation);
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
  return onlineUsers.includes(userId) ? "Online" : "Offline";
  };


  return (
 <div>
      <div className='flex space-x-4 h-[10vh] px-3 py-3 bg-gray-700 hover:bg-slate-600 duration-300 '>
        {/* <div className={`avatar ${isOnline ? "online" : ""}`}> */}
        <div className="avatar avatar-online">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
          </div>
        </div>
 
        <div>
          <h1 className='text-xl'>{selectedConversation.name}</h1>
          {/* <h1 className='text-xl'>Ashish</h1> */}
          <span className='text-sm'> {getOnlineUsersStatus(selectedConversation._id)}</span>
        </div>
      </div>
      
    </div>
  )
}

export default Chatuser;
