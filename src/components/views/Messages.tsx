import React from "react";
import Message from "./Message";

export interface MessageInterface {
  pfp: string;
  displayName: string;
  message: string;
}

const Messages = () => {
  let messageArray: MessageInterface[] = [
    {
      pfp: "https://img.wattpad.com/05e3d6575649c5b40d65bb08ce22dd789b0026ac/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6b464f456e2d7a696c4863786e513d3d2d33392e313633333161353163653131323638323530363734303330303034362e6a7067?s=fit&w=720&h=720",
      displayName: "Killua",
      message: "What up my Brotha",
    },
    {
      pfp: "https://ih1.redbubble.net/image.2194648343.2376/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
      displayName: "Kite",
      message: "Brooooo I'm dead 😭",
    },
    {
      pfp: "https://preview.redd.it/kxelbxjj0xe51.jpg?auto=webp&s=200052d58b503b7c0aaa4435324f6fb0d1fb136f",
      displayName: "Kurapika",
      message: "Your shit's ass boy",
    },
    {
      pfp: "https://i.pinimg.com/550x/78/e0/7b/78e07bad02961544b3049ef64ae051aa.jpg",
      displayName: "Hisoka",
      message: "This is has got some potential",
    },
    {
      pfp: "https://pbs.twimg.com/media/Fa9fMaYWIAEY7vq.jpg",
      displayName: "Leorio",
      message: "Medical school is tough!",
    },
    {
      pfp: "https://64.media.tumblr.com/27add3a278daa06ae4051d2cba85e1a6/tumblr_owt7umT49k1vy2tgqo4_400.jpg",
      displayName: "Knuckle",
      message: "Miss you brodi",
    },
    {
      pfp: "https://i.pinimg.com/originals/ac/39/e6/ac39e607138b67bf1ac552e215a1be58.png",
      displayName: "Meruem",
      message: "I am the King!",
    },
    {
      pfp: "https://wallpapers.com/images/hd/ging-freecss-1280-x-720-wallpaper-7iqkmqsnw59hf4zp.jpg",
      displayName: "Ging",
      message: "Discover the world!",
    },
    {
      pfp: "https://i.pinimg.com/originals/05/35/93/053593d50439c663695835168390a324.jpg",
      displayName: "Biscuit",
      message: "Keep on hitting the lab you've got it",
    },
    {
      pfp: "https://pm1.aminoapps.com/6342/b5d907b25e3d204793cf9a8ccc6403376fc1c886_00.jpg",
      displayName: "Ikalgo",
      message: "I'm that squiddy",
    },
    {
      pfp: "https://preview.redd.it/yjhw56zrbun41.jpg?auto=webp&s=0127f1a6910c294a585eb78200c7cca115b9b351",
      displayName: "Feitan",
      message: "Bitch ass motha fuckka",
    },
  ];

  let mappedMessages = messageArray.map(({ pfp, displayName, message }) => {
    return <Message pfp={pfp} displayName={displayName} message={message} />;
  });

  return (
    <div className="bg-gradient-to-br from-prim to-accent grid-cols-subgrid col-span-2 grid-row-subgrid row-span-4 rounded-lg hidden lg:flex">
      <div className="h-full w-full p-1">
        <div className="h-full overflow-scroll overflow-x-hidden scroll rounded ">
          <h3 className="text-black text-m font-heading text-center">
            Messages
          </h3>
          <div className="">
          {mappedMessages}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
