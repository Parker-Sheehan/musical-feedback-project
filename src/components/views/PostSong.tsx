import { useRef } from "react";
import { useAppSelector } from "../../store/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface NewSongObj {
  title: string;
  embeddedLink: string;
  artLink: string;
  genre: string;
}

const PostSong = () => {

  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const genreRef = useRef<HTMLSelectElement | null>(null);
  let loggedInUser = useAppSelector((state) => state.login);

  let { userId } = loggedInUser;

  const submitSongHandler = async () => {
    if (
      titleRef.current?.value &&
      linkRef.current?.value &&
      genreRef.current?.value &&
      +genreRef.current?.value !== 0
    ) {
      let embeddedLink: string = "";
      let artLink: string = "";

      console.log(genreRef.current.value)

      try {
        const url = "https://soundcloud.com/oembed";

        const data = "format=json&url=" + linkRef.current?.value;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data,
        });

        const text: string = await response.text();

        console.log(text);

        let splitText: string[] = text.split(`src`);
        // console.log(splitText[0])
        let albumArtLinkSplit: string[] =
          splitText[0].split('"thumbnail_url":"');
        let albumArtLinkSplitTwo: string[] = albumArtLinkSplit[1].split('"');
        let embeddedLinkSplit: string[] = splitText[1].split(`&show_artwork`);

        embeddedLink = embeddedLinkSplit[0].slice(3);
        artLink = albumArtLinkSplitTwo[0];
      } catch {
        return alert("use valid url");
      }

      const newSongInfoObj: NewSongObj = {
        title: titleRef.current?.value,
        embeddedLink,
        artLink,
        genre: genreRef.current?.value,
      };

      // await axios.post(
      //   `http://localhost:3000/createNewSong/${userId}`,
      //   newSongInfoObj
      // );
      console.log(newSongInfoObj);

      // return navigate("/Profile");
    } else {
      return alert("please enter all feilds");
    }
  };

  let genreArray = [
    "Select Genre",
    "Drum and Bass",
    "Trap",
    "House",
    "Dubstep",
    "Techno",
    "Bass",
    "Experimental",
    "Trance",
    "Hard Dance",
    "Breakbeat"
  ]

  let genreOptions = genreArray.map((genre, key) => {
    console.log(key,"this is key")
    return <option value={key}>{genre}</option>
  })

  return (
    <main className="size-full flex flex-column items-center">
      <h1 className="text-heading text-text">Upload New Song</h1>
        <div className="flex flex-col items-center justify-evenly bg-background2 w-3/4 h-fit lg:w-1/2 rounded-lg" >
          <div className="m-4">
            <h1 className="text-heading text-text">Title</h1>
            <input ref={titleRef} placeholder="Title of song" type="text" />
            <h1 className="text-heading text-text mt-3">Link</h1>
            <input ref={linkRef} placeholder="url from sound cloud" type="text" />
            <h1 className="text-heading text-text mt-3">Genre</h1>
            <select ref={genreRef} placeholder="Genre" name="genre" id="genre">
              {genreOptions}
            </select>
            <h1 className="text-heading text-text mt-3">User's question</h1>
            <textarea className="block p-1" cols={28} rows={10} placeholder="Ask a question about a specific aspect that you would like feadback on."></textarea>
          </div>
          <button
            onClick={() => {
              submitSongHandler();
            }}
            className="text-heading text-text bg-prim p-2 rounded-md mb-4"
          >
            submit song
          </button>
        </div>
    </main>
  );
};

export default PostSong;
