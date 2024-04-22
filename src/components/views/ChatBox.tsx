import { FC, useEffect } from "react";
import ChatRooms from "./ChatRooms";
import { useAppSelector } from "../../store/store";
import ChatRoom from "./ChatRoom";
import { ProfileData } from "./ProfilePage";
import NewChatRoom from "./NewChatRoom"
import io from "socket.io-client";

const socket = io("http://localhost:3000")

export interface MessageUser {
  profilePicture: string;
  displayName: string;
  userId: string;
}

export interface Message {
  chatRoomId: number;
  content: string;
  createdAt: string;
  messageId: number;
  recipientId: number;
  recipientSeen: boolean;
  senderId: number;
}

export interface ChatRoomInterface {
  chatRoomId: number;
  createdAt: string;
  messages: Message[];
  updatedAt: string;
  user1: MessageUser;
  user1Id: number;
  user2: MessageUser;
  user2Id: number;
}

interface MessagesProps {
  openChatRoomHandler: (chatRoomId: number) => void;
  currentChatRoom: number;
  chatRooms: ChatRoomInterface[]
  profileData: ProfileData;
  getChatRooms: () => void
  handleSetChatRooms: (newChatRoomArray: ChatRoomInterface[]) => void
}

const Messages: FC<MessagesProps> = ({
  openChatRoomHandler,
  currentChatRoom,
  chatRooms,
  profileData,
  getChatRooms,
  handleSetChatRooms
}) => {
  
  let loggedInUser = useAppSelector((state) => state.login);

  useEffect(() => {
    // Join chat rooms when component mounts
    chatRooms.forEach(chatRoom => {
      socket.emit('joinRoom', chatRoom.chatRoomId);
    });

    socket.emit('joinRoom', `userRoom${loggedInUser.userId}`)

    // Listen for incoming messages
    socket.on('message', (message) => {
      console.log(message)
      if(message.roomId !== typeof("string")){

      }
        // Handle incoming message
        let newChatRoomArray = chatRooms.map((chatRoom) => {
          if(chatRoom.chatRoomId === message.roomId){
            chatRoom.messages = message.newMessageArray
          }
          return chatRoom
        })
        
      // Put chat room at front of array
      for(let i = 0; i < newChatRoomArray.length; i++){
        if(newChatRoomArray[i].chatRoomId === message.roomId){
          let newChatRoom = newChatRoomArray[i]
          newChatRoomArray.splice(i, 1)
          newChatRoomArray.unshift(newChatRoom)
          }
      }
      console.log('Received message:', message);
      handleSetChatRooms(newChatRoomArray)
    });

    socket.on('newChatRoom', ({newChatRoom}) => {

      // Join new chat room
      console.log(newChatRoom)
      socket.emit('joinRoom', newChatRoom.chatRoomId);
      
      // add new chatRoom obj to chatRoomArray
      let newChatRoomArray = chatRooms
      newChatRoomArray = [newChatRoom, ... newChatRoomArray]

      console.log(newChatRoomArray)

      handleSetChatRooms(newChatRoomArray)
    })

    
    // Clean up when component unmounts
    // return () => {
    //   // Leave chat rooms when component unmounts or when chatRooms change
    //   chatRooms.forEach(chatRoom => {
    //     socket.emit('leaveRoom', chatRoom.chatRoomId);
    //   });
      
    //   // Close Socket.IO connection when component unmounts
    //   socket.disconnect();
    // };
  }, [chatRooms]);

  console.log(chatRooms)
  

  return (
    <>
      {currentChatRoom === 0 && (
        <div className="bg-gradient-to-br from-prim to-accent grid-cols-subgrid col-span-2 grid-row-subgrid row-span-4 rounded-lg hidden lg:flex min-w-[240px] h-[720px]">
          <div className="h-full w-full p-1">
            <div className="h-full overflow-y-scroll overflow-x-hidden scroll rounded ">
              <h3 className="text-black text-m font-heading text-center">
                Messages
              </h3>
              <div className="">
                {chatRooms &&
                  chatRooms.map((chatRoom: ChatRoomInterface) => {
                    if (loggedInUser.userId === chatRoom.user1Id) {
                      let { profilePicture, displayName } = chatRoom.user2;
                      let message = chatRoom.messages[chatRoom.messages.length - 1].content;
                      let seen = true
                      for(let i = chatRoom.messages.length -1; i >= 0; i--){
                        if(chatRoom.messages[i].recipientId === loggedInUser.userId){
                          seen = chatRoom.messages[i].recipientSeen 
                          break
                        }
                      }
                      return (
                        <ChatRooms
                          openChatRoomHandler={openChatRoomHandler}
                          key={chatRoom.chatRoomId}
                          pfp={profilePicture}
                          displayName={displayName}
                          message={message}
                          chatRoomId={chatRoom.chatRoomId}
                          chatRooms={chatRooms}
                          seen={seen}
                          handleSetChatRooms={handleSetChatRooms}
                        />
                      );
                    } else {
                      let { profilePicture, displayName } = chatRoom.user1; 
                      let message = chatRoom.messages[chatRoom.messages.length - 1].content;
                      let seen = true
                      for(let i = chatRoom.messages.length -1; i >= 0; i--){
                        if(chatRoom.messages[i].recipientId === loggedInUser.userId){
                          seen = chatRoom.messages[i].recipientSeen 
                        }
                      }
                      return (
                        <ChatRooms
                        openChatRoomHandler={openChatRoomHandler}
                        key={chatRoom.chatRoomId}
                        pfp={profilePicture}
                        displayName={displayName}
                        message={message}
                        chatRoomId={chatRoom.chatRoomId}
                        chatRooms={chatRooms}
                        seen={seen}
                        handleSetChatRooms={handleSetChatRooms}

                        />
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
      {currentChatRoom > 0 && chatRooms && 
      <ChatRoom openChatRoomHandler={openChatRoomHandler} chatRooms={chatRooms} currentChatRoom={currentChatRoom}/>}
      {currentChatRoom === -1 && profileData && 
      <NewChatRoom profileData={profileData} openChatRoomHandler={openChatRoomHandler} getChatRooms={getChatRooms}/>
      }
    </>
  );
};

export default Messages;
