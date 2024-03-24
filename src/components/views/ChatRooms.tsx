import { FC, useState } from "react";
import { useAppSelector } from "../../store/store";
import axios from "axios";
import { ChatRoomInterface } from "./ChatBox";

interface ChatRoomProps {
  pfp: string;
  message: string;
  displayName: string;
  chatRoomId: number;
  openChatRoomHandler: (chatRoomId: number) => void;
  seen: boolean;
  handleSetChatRooms: (newChatRoomArray: ChatRoomInterface[]) => void
  chatRooms: ChatRoomInterface[]
}

const Message: FC<ChatRoomProps> = ({
  pfp,
  message,
  displayName,
  openChatRoomHandler,
  chatRoomId,
  seen,
  handleSetChatRooms,
  chatRooms

}) => {
  console.log(seen);

  let loggedInUser = useAppSelector((state) => state.login);


  const messageSeenHandler = async () => {
    console.log(chatRoomId)
    console.log(loggedInUser.userId)
    axios.post(`http://localhost:3000/messageSeen`, {chatRoomId, userId: loggedInUser.userId})

    let newChatRoomArray = chatRooms

    newChatRoomArray.map((chatRoom) => {
      if(chatRoom.chatRoomId === chatRoomId){

        chatRoom.messages.map((message) => {
          if(message.recipientId === loggedInUser.userId) {
            message.recipientSeen = true
          }
          return message
        })

      }
      return chatRoom
    })

    handleSetChatRooms(newChatRoomArray)


  }

  return (
    <>
      {seen && (
        <div
          className="w-full h-16 flex items-center hover:opacity-100 opacity-70 hover:cursor-pointer"
          onClick={() => {
            openChatRoomHandler(chatRoomId);
          }}
        >
          <div
            className="bg-cover bg-center bg-no-repeat h-10 w-12 rounded-full ml-1 "
            style={{
              backgroundImage: `url(${pfp})`,
            }}
          ></div>
          <div className="size-full flex flex-col justify-around ml-3">
            <p className="m-0 text-background text-m font-body mt-2">
              {displayName}
            </p>
            <p className="m-0 text-sm text-background font-body mb-2 overflow-hidden">
              {message}
            </p>
          </div>
        </div>
      )}

      {!seen && (
        <div
          className="w-full h-16 flex items-center hover:opacity-100 opacity-90 hover:cursor-pointer"
          onClick={() => {
            openChatRoomHandler(chatRoomId);
            messageSeenHandler()
          }}
        >
          <div
            className="bg-cover bg-center bg-no-repeat h-10 w-12 rounded-full ml-1 border-2 border-sec"
            style={{
              backgroundImage: `url(${pfp})`,
            }}
          ></div>
          <div className="size-full flex flex-col justify-around ml-3">
            <p className="m-0 text-background text-m font-body mt-2">
              {displayName}
            </p>
            <p className="m-0 text-sm text-background font-body mb-2 overflow-hidden">
              {message}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
