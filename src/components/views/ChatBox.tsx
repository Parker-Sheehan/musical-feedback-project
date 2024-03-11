import { FC } from "react";
import ChatRooms from "./ChatRooms";
import { useAppSelector } from "../../store/store";
import ChatRoom from "./ChatRoom";
import { ProfileData } from "./ProfilePage";
import NewChatRoom from "./NewChatRoom"

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
}

const Messages: FC<MessagesProps> = ({
  openChatRoomHandler,
  currentChatRoom,
  chatRooms,
  profileData,
  getChatRooms
}) => {
  
  let loggedInUser = useAppSelector((state) => state.login);
  

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
                      let message =
                        chatRoom.messages[chatRoom.messages.length - 1].content;
                      return (
                        <ChatRooms
                          openChatRoomHandler={openChatRoomHandler}
                          key={chatRoom.chatRoomId}
                          pfp={profilePicture}
                          displayName={displayName}
                          message={message}
                          chatRoomId={chatRoom.chatRoomId}

                        />
                      );
                    } else {
                      let { profilePicture, displayName } = chatRoom.user1;
                      let message =
                        chatRoom.messages[chatRoom.messages.length - 1].content;
                      return (
                        <ChatRooms
                        openChatRoomHandler={openChatRoomHandler}
                        key={chatRoom.chatRoomId}
                        pfp={profilePicture}
                        displayName={displayName}
                        message={message}
                        chatRoomId={chatRoom.chatRoomId}
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
