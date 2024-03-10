import React, { FC, useEffect, useState, useMemo, useRef } from "react";
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

  const messagesRef = useRef<HTMLDivElement>(null);


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

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messagesArray]);

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
          {chatRoom && (chatRoom.user1Id === loggedInUser.userId ? chatRoom.user2.displayName : chatRoom.user1.displayName)}
          </h3>
          <div className="  h-4/5 w-full flex flex-col overflow-scroll max-w-[240px]" ref={messagesRef}>
            {messagesArray && messagesArray.map((mappingMessage) => {
            if(mappingMessage.senderId === loggedInUser.userId){
                return <div className=" bg-white size-fit self-end mb-1 rounded-md px-1">{mappingMessage.content}</div>
            }else {
                return <div className=" bg-blue-100 size-fit text-left mb-1 rounded-md px-1">{mappingMessage.content}</div>
            }
            })}
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
