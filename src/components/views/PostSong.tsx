import { useRef } from "react";
import { useAppSelector } from "../../store/store";
import "./PostSong.css";
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
      genreRef.current?.value
    ) {
      let embeddedLink: string = "";
      let artLink: string = "";

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

      await axios.post(
        `http://localhost:3000/createNewSong/${userId}`,
        newSongInfoObj
      );
      console.log(newSongInfoObj);

      return navigate("/Profile");
    } else {
      return alert("please enter all feilds");
    }
  };

  return (
    <main id="">
      <h1>Upload New Song</h1>
      <div id="song-info-card">
        <div className="inside-song-info-card" id="song-info-card-right">
          <div id="embedded-song-link">
            <h1>Title</h1>
            <input ref={titleRef} type="text" />
            <h1>Link</h1>
            <input ref={linkRef} type="text" />
            <h1>Genre</h1>
            <select ref={genreRef} name="genre" id="genre">
              <option value="dnb">Drum and Bass</option>
              <option value="trap">Trap</option>
              <option value="edm">EDM</option>
            </select>
          </div>
          <button
            onClick={() => {
              submitSongHandler();
            }}
          >
            submit song
          </button>
        </div>
      </div>
    </main>
  );
};

export default PostSong;
