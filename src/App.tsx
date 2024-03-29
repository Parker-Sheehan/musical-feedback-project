import NavBar from "./components/main/NavBar";
import {Routes, Route} from 'react-router-dom'
import Home from "./components/views/Home";
import LogIn from "./components/views/LogIn";
import SignUp from "./components/views/SignUp";
import ProfilePage from "./components/views/ProfilePage";
import ReviewSong from "./components/views/ReviewSong";
import PostSong from "./components/views/PostSong";
import SongProfilePage from "./components/views/SongProfilePage";
import ViewReviewPage from "./components/views/ViewReviewPage";
import axios from "axios";

function App() {  

  return (
    <>
      <NavBar/>
      <>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/LogIn" element={<LogIn/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/Profile" element={<ProfilePage/>}/>
          <Route path="/Profile/:id" element={<ProfilePage/>} />
          <Route path="/ReviewSong" element={<ReviewSong/>} />
          <Route path="/PostSong" element={<PostSong/>}/>
          <Route path="/SongProfilePage/:id" element={<SongProfilePage/>}/>
          <Route path="/ViewReview/:id" element={<ViewReviewPage/>}/>
        </Routes>
      </>
    </>
  )
}

export default App
