import {FC} from 'react'
import { MessageInterface } from './Messages'

const Message: FC<MessageInterface> = ({pfp, message, displayName}) => {
  return (
    <div className="w-full h-16 flex items-center hover:opacity-100 opacity-70">
                <div
                  className="bg-cover bg-center bg-no-repeat h-10 w-12 rounded-full ml-1 "
                  style={{
                    backgroundImage: `url(${pfp})`,
                  }}
                ></div>
                <div className="size-full flex flex-col justify-around ml-3">
                  <p className="m-0 text-background text-m font-body mt-2">{displayName}</p>
                  <p className="m-0 text-sm text-background font-body mb-2 overflow-hidden">
                    {message}
                  </p>
                </div>
              </div>
  )
}

export default Message