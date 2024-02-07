import { BsFillPersonFill } from "react-icons/bs";
import { TbMusicHeart } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { signIn, signOut } from "../../store/slices/loginSlice";
import { useEffect } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";


const NavBar = () => {
  const dispatch = useAppDispatch();

  let loggedInUser = useAppSelector((state) => state.login);
  let handleSignOut = () => {
    console.log(document.cookie, 'cookie')
    dispatch(signOut())
  }

  useEffect(() => {

    let authenticateAndLogIn = async () => {
      let data = await axios.get('http://localhost:3000/authenticateAndLogIn')
      console.log('yay')
      console.log(data.data, "inside the function")
      console.log(typeof (data.data))
      dispatch(signIn(data.data))
    }

    authenticateAndLogIn()
  }, [])

  console.log(loggedInUser.userId);
  return (
    <>
      {
        !loggedInUser.userId &&
        <nav className="flex items-center justify-around h-12 w-full bg-background-100 border-y-2 border-background2">
          <Link to="/" className="text-text text-sm no-underline">
            <TbMusicHeart size="25px" />
          </Link>
          <div className="width-40 flex flex-center items-center justify-around w-5/12">
            <Link to="/LogIn" className="text-text text-sm no-underline">Post Song</Link>
            <Link to="/LogIn" className="text-text text-sm no-underline">Review Song</Link>
            <Link to="/LogIn" className="text-text text-sm no-underline">Dashboard</Link>
          </div>
          <Link to="/LogIn" className="text-text text-sm no-underline">
            log in/register
          </Link>
        </nav>
      }
      {
        loggedInUser.userId &&
        <nav className="flex items-center justify-around h-16 w-full bg-purple">
          <Link className="text-text text-sm no-underline" to="/">
            <TbMusicHeart size="25px" />
          </Link>
          <div className="width-40 flex flex-center items-center justify-around w-4/12">
            <Link to="/PostSong" className="text-text text-sm no-underline">Post Song</Link>
            <Link to="/ReviewSong" className="text-text text-sm no-underline">Review Song</Link>
            <Link to="/Profile" className="text-text text-sm no-underline">Dashboard</Link>
          </div>
          <Link onClick={handleSignOut} className="text-text text-sm no-underline" to="/LogIn">
            <h5>sign out</h5>
          </Link>
        </nav>
      }
    </>
  );
};

export default NavBar;
