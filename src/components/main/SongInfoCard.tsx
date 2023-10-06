import {FC} from 'react'
import { SongInfo } from "../views/ProfilePage";
interface SongInfoProp{
  song:SongInfo
}

const SongInfoCard: FC<SongInfoProp> = ({song}) => {

  console.log(song)
  return (
    <div id="song-info-card">
        <div className="inside-song-info-card" id="song-info-card-left">
          <div id="album-cover-card" 
          style={{
          backgroundImage: `url(${song?.albumArt})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}>
            <h1>Album</h1>
          </div>
        </div>
        <div className="inside-song-info-card" id="song-info-card-right">
          <div id="embedded-song-link">
            <h1>embedded link</h1>
          </div>
        </div>
      </div>
  )
}

export default SongInfoCard