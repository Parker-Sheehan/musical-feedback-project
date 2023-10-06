import { BsFillPersonFill } from "react-icons/bs";
import { TbMusicHeart } from "react-icons/tb";
import { Link } from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {
  return (
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
  );
};

export default NavBar;
