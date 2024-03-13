import React, { FC, useEffect, useState, useMemo, useRef } from "react";
import { ChatRoomInterface } from "./ChatBox";
import { useAppSelector } from "../../store/store";
import { Message } from "./ChatBox";
import axios from "axios";
import { ProfileData } from "./ProfilePage";
import io from "socket.io-client";

const socket = io("http://localhost:3000");


interface NewChatRoomProps {
  profileData : ProfileData
  openChatRoomHandler: (chatRoomId: number) => void;
  getChatRooms: () => void
}

const NewChatRoom: FC<NewChatRoomProps> = ({
  profileData,
  openChatRoomHandler,
  getChatRooms
}) => {
  const loggedInUser = useAppSelector((state) => state.login);

  const [message, setMessage] = useState("");

  const messagesRef = useRef<HTMLDivElement>(null);

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
    // Dynamically adjust the textarea height as the user types
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    
  };

  const createChatRoomHandler = async () => {
    console.log("hit createChatRoom");
    console.log(profileData.userId);
    
    console.log(profileData);
    let createChatRoomResponse = await axios.post(
      "http://localhost:3000/createChatRoom",
      { user1Id: loggedInUser.userId, user2Id: profileData.userId, content: message }
    );
    console.log(createChatRoomResponse);
    socket.emit('joinRoom', `userRoom${profileData.userId}`)
    socket.emit("newChatRoom", {
      roomId: `userRoom${profileData.userId}`,
      newChatRoom: createChatRoomResponse.data
    });
    socket.emit("leaveRoom", `userRoom${profileData.userId}`)
    await getChatRooms()
    openChatRoomHandler(createChatRoomResponse.data.chatRoomId)
  };

  return (
    <div className="bg-gradient-to-br from-prim to-accent grid-cols-subgrid col-span-2 grid-row-subgrid row-span-4 rounded-lg hidden lg:flex min-w-[240px] h-[720px]">
      <div className="h-full w-full p-1">
        <div className="h-full text-wrap rounded">
          <h5
            className="absolute ml-1"
            onClick={() => {
              openChatRoomHandler(0);
            }}
          >
            {"<"}
          </h5>
          <h3 className="text-black text-m font-heading text-center">
          {profileData && profileData.displayName}
          </h3>
          <div className="  h-4/5 w-full flex flex-col" ref={messagesRef}>
          </div>
          <div>
            <textarea
              value={message}
              onChange={handleMessageChange}
              className="scroll-mx-0 resize-none w-full min-h-16 mt-2 rounded-md"
              placeholder="Type your message..."
            />
            <button
              className=" size-full bg-sec2 text-text rounded-md"
              onClick={createChatRoomHandler}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChatRoom;
