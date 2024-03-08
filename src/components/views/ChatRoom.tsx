import React, {FC} from 'react'
import { ChatRoomInterface } from './ChatBox'
import { useAppSelector } from '../../store/store';

interface ChatRoomProps{
    chatRooms: ChatRoomInterface[];
    currentChatRoom: number;
    openChatRoomHandler: (chatRoomId: number) => void;
}

const ChatRoom:FC<ChatRoomProps> = ({chatRooms, currentChatRoom, openChatRoomHandler}) => {

    let loggedInUser = useAppSelector((state) => state.login);
    

  return (
    (
        <div className="bg-gradient-to-br from-prim to-accent grid-cols-subgrid col-span-2 grid-row-subgrid row-span-4 rounded-lg hidden lg:flex min-w-[240px] h-[720px]">
          <div className="h-full w-full p-1">
            <div className="h-full overflow-scroll overflow-x-hidden scroll rounded ">
                <h5 className=" absolute ml-1" onClick={()=>{openChatRoomHandler(0)}}>{"<"}</h5>
              <h3 className="text-black text-m font-heading text-center">
                {chatRooms.map((chatRoom) => {
                  if (chatRoom.chatRoomId === currentChatRoom) {
                    if(chatRoom.user1Id === loggedInUser.userId){
                      console.log(chatRoom);
                      return chatRoom.user2.displayName;
                    }else{
                      return chatRoom.user1.displayName
                    }
                  }
                  return null;
                })}
              </h3>
              <div className="size-full flex flex-col">
                {chatRooms.map((chatRoom) => {
                  if(chatRoom.chatRoomId === currentChatRoom) {
                    return chatRoom.messages.map((message) => {
                      if(message.senderId === loggedInUser.userId){
                      return <div className=" bg-white size-fit self-end">
                        {message.content}
                      </div>
                      }else{
                        return <div className=" bg-blue-100 size-fit text-left">
                        {message.content}
                      </div>
                      }
                    })
                  }
                  return null
                })}
              </div>
            </div>
          </div>
        </div>
      )
  )
}

export default ChatRoom