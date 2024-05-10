import { BsFillPersonFill } from "react-icons/bs";
import { TbMusicHeart } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { signOut } from "../../store/slices/loginSlice";
import { useEffect, useState } from "react";
import instance from "../../utils/axios";
import { Alert } from "react-bootstrap";
import { MessageUser } from "../views/ChatBox";


const NavBar = () => {
  const dispatch = useAppDispatch();

  let loggedInUser = useAppSelector((state) => state.login);
  
  let handleSignOut = () => {
    console.log(document.cookie, 'cookie')
    dispatch(signOut())
  }

  let [search, setSearch] = useState("")
  let [searchResults ,setSearchResults] = useState<MessageUser[]>()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  useEffect(() => {
    // debounce function

    const timeout = setTimeout(async() => {
      if(search !== ""){
        let userSearchResults = await instance.get(`http://localhost:3000/userSearch/${search}`)
        console.log(userSearchResults.data)
        setSearchResults(userSearchResults.data)
        console.log(userSearchResults)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  },[search])




  console.log(loggedInUser.userId);
  return (
    <>
      {
        !loggedInUser.userId &&
        <nav className="flex items-center justify-around min-h-12 w-full bg-background-100 border-b-2 border-background2">
          <Link to="/" className="text-text text-sm no-underline">
            <TbMusicHeart size="25px" />
          </Link>
          {/* <input type="text" placeholder="Search..." className="bg-red-100"/> */}
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
        <>
        <nav className="flex items-center justify-around min-h-12 w-full bg-purple border-b-2 border-background2">
          <div className="flex flex-row justify-evenly w-1/3">
          <Link className="text-text text-sm no-underline" to="/">
            <TbMusicHeart size="25px" />
          </Link>
          <div>

          <div className="bg-prim rounded-full px-3 size-fit opacity-70">
          <input  type="text" placeholder="Search user..." className="bg-transparent size-full outline-none select-none rounded-full placeholder-sec2 text-sec" onChange={(handleSearchChange)} onBlur={() => {setTimeout(() => {setSearch("")}, 222)}} value={(search)}/>
          </div>
          {search !== "" && 
          <div className=" bg-prim w-52 size-fit absolute p-2">
            {searchResults?.map((result) => {
             return  <>
              <Link
              className="w-full h-16 flex items-center hover:opacity-100 opacity-70 hover:cursor-pointer decoration-transparent"
              to={"/Profile/" + result.userId}
              >
              <div
                className="bg-cover bg-center bg-no-repeat h-10 w-12 rounded-full ml-1 "
                style={{
                  backgroundImage: `url(${result.profilePicture})`,
                }}
                ></div>
              <div className="size-full flex flex-col justify-around ml-3">
                <p className="m-0 text-background text-m mt-2">
                  {result.displayName}
                </p>
              </div>
            </Link>
            </>
            })}
          </div>
          }
          </div>
          
          </div>
          <div className="width-40 flex flex-center items-center justify-around w-1/3">
            <Link to="/PostSong" className="text-text text-sm no-underline">Post Song</Link>
            <Link to="/ReviewSong" className="text-text text-sm no-underline">Review Song</Link>
            <Link to="/Profile" className="text-text text-sm no-underline">Dashboard</Link>
          </div>
          <div className="w-1/3">

          <Link onClick={handleSignOut} className="text-text text-sm no-underline flex flex-row justify-center" to="/LogIn">
            <h5>sign out</h5>
          </Link>
          </div>
        </nav>

          </>
      }
    </>
  );
};

export default NavBar;
