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
      message: "What up my ninja",
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
        pfp: "https://img.wattpad.com/05e3d6575649c5b40d65bb08ce22dd789b0026ac/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6b464f456e2d7a696c4863786e513d3d2d33392e313633333161353163653131323638323530363734303330303034362e6a7067?s=fit&w=720&h=720",
        displayName: "Killua",
        message: "What up my ninja",
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
        pfp: "https://img.wattpad.com/05e3d6575649c5b40d65bb08ce22dd789b0026ac/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6b464f456e2d7a696c4863786e513d3d2d33392e313633333161353163653131323638323530363734303330303034362e6a7067?s=fit&w=720&h=720",
        displayName: "Killua",
        message: "What up my ninja",
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
  ];

  let mappedMessages = messageArray.map(({ pfp, displayName, message }) => {
    return <Message pfp={pfp} displayName={displayName} message={message} />;
  });

  return (
    <div className="bg-gradient-to-br from-prim to-accent grid-cols-subgrid col-span-2 grid-row-subgrid row-span-4 rounded-lg">
      <div className="h-full w-full p-1">
        <div className="h-full border-solid border-2 overflow-scroll overflow-x-hidden scroll border-sec rounded ">
          <h3 className="text-black text-m font-heading text-center">
            Messages
          </h3>
          {mappedMessages}
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
