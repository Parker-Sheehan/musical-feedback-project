import { BsFillPersonFill } from "react-icons/bs";
import { TbMusicHeart } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/store";
import "./NavBar.css"
import { signIn, signOut } from "../../store/slices/loginSlice";
import { useEffect } from "react";
import axios from "axios";

const NavBar = () => {
  const dispatch = useAppDispatch()

  let loggedInUser = useAppSelector((state) => state.login);
  let handleSignOut = () => {
    console.log(document.cookie,'cookie')
    dispatch(signOut())
  }


  useEffect(() => {

    let authenticateAndLogIn = async () => {
      let data = await axios.get('http://localhost:3000/authenticateAndLogIn')
      console.log('yay')
       console.log(data.data, "inside the function")
       console.log(typeof(data.data))
       dispatch(signIn(data.data))
    }

    authenticateAndLogIn()
  },[])

  console.log(loggedInUser.userId);
  return (
    <>
    {
      !loggedInUser.userId &&
      <nav>
      <Link className="nav-left" to="/">
        <TbMusicHeart size="25px" />
      </Link>
    <div className="nav-center">
      <Link to="/PostSong">Post Song</Link>
      <Link to="/ReviewSong">Review Song</Link>
      <Link to="/Profile">View Profile</Link>
    </div>
    <Link className="nav-right" to="/LogIn">
      <BsFillPersonFill size="25px" />
      <h5>log in/register</h5>
    </Link>
  </nav>
    }
    {
      loggedInUser.userId &&
      <nav>
      <Link className="nav-left" to="/">
        <TbMusicHeart size="25px" />
      </Link>
    <div className="nav-center">
      <Link to="/PostSong">Post Song</Link>
      <Link to="/ReviewSong">Review Song</Link>
      <Link to="/Profile">View Profile</Link>
    </div>
    <Link onClick={handleSignOut} className="nav-right" to="/LogIn">
      <BsFillPersonFill size="25px" />
      <h5>sign out</h5>
    </Link>
  </nav>
    }
    </>
  );
};

export default NavBar;
