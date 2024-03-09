import React, { FC, useEffect, useState, useMemo } from "react";
import { ChatRoomInterface } from "./ChatBox";
import { useAppSelector } from "../../store/store";
import { Message } from "./ChatBox";
import axios from "axios";

interface ChatRoomProps {
  chatRooms: ChatRoomInterface[];
  currentChatRoom: number;
  openChatRoomHandler: (chatRoomId: number) => void;
}

const ChatRoom: FC<ChatRoomProps> = ({
  chatRooms,
  currentChatRoom,
  openChatRoomHandler,
}) => {
  const loggedInUser = useAppSelector((state) => state.login);

  const [message, setMessage] = useState("");

  const [messagesArray, setMessagesArray] = useState<Message[]>([]);

  const chatRoom = useMemo(() => {
    return chatRooms.filter((chatRoom) => chatRoom.chatRoomId === currentChatRoom)[0];
  }, [chatRooms, currentChatRoom])

  console.log(chatRoom)

  const getMessageArray = async () => {
    let getMessageArrayResponse = await axios.get(
      `http://localhost:3000/getMessages/${currentChatRoom}`
    );
    console.log(getMessageArrayResponse);
    setMessagesArray(getMessageArrayResponse.data);
  };

  useEffect(() => {
    getMessageArray();
  }, [currentChatRoom]);

  console.log(messagesArray);

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
    // Dynamically adjust the textarea height as the user types
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  console.log(messagesArray);

  const handleSendMessage = async () => {
    let recipientId;
    let senderId = loggedInUser.userId;


    if(senderId === chatRoom.user1Id){
        recipientId = chatRoom.user2Id
    }else{
        recipientId = chatRoom.user1Id
    }

    console.log(chatRoom)
    let createNewMessageResponse = await axios.post(`http://localhost:3000/createNewMessage`, {content: message, chatRoomId: currentChatRoom, recipientId: recipientId, senderId: senderId})

    console.log(createNewMessageResponse.data)
    setMessagesArray(createNewMessageResponse.data)
  };

  return (
    <div className="bg-gradient-to-br from-prim to-accent grid-cols-subgrid col-span-2 grid-row-subgrid row-span-4 rounded-lg hidden lg:flex min-w-[240px] h-[720px]">
      <div className="h-full w-full p-1">
        <div className="h-full overflow-scroll text-wrap scroll rounded">
          <h5
            className="absolute ml-1"
            onClick={() => {
              openChatRoomHandler(0);
            }}
          >
            {"<"}
          </h5>
          <h3 className="text-black text-m font-heading text-center">
          {chatRoom && (chatRoom.user1Id === loggedInUser.userId ? chatRoom.user2.displayName : chatRoom.user1.displayName)}
          </h3>
          <div className="h-5/6 w-full flex flex-col">
            {messagesArray && messagesArray.map((mappingMessage) => {
            if(mappingMessage.senderId === loggedInUser.userId){
                return <div className=" bg-white size-fit self-end">{mappingMessage.content}</div>
            }else {
                return <div className=" bg-blue-100 size-fit text-left">{mappingMessage.content}</div>
            }
            })}
          </div>
          <div>
            <textarea
              value={message}
              onChange={handleMessageChange}
              className="scroll-mx-0 resize-none overflow-hidden w-full"
              placeholder="Type your message..."
            />
            <button
              className=" size-full bg-sec2 text-text"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
