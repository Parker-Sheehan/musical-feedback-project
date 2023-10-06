import React from 'react'
import './PostSong.css'

const PostSong = () => {
  return (
    <main id="">
      <h1>Upload New Song</h1>
      <div id="song-info-card">
        <div className="inside-song-info-card" id="song-info-card-left">
          <div id="album-cover-card">
            <h1>Album</h1>
            <input type="file" />
          </div>
        </div>
        <div className="inside-song-info-card" id="song-info-card-right">
          <div id="embedded-song-link">
            <h1>Title</h1>
            <input type="text" />
            <h1>Link</h1>
            <input type="text" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default PostSong