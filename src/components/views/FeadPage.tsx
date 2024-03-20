import React, { useEffect, useState } from 'react'
import Post from './Post'
import axios from 'axios'
import { useAppSelector } from '../../store/store'

export interface PostInfo {
  songId: number;
  embeddedLink: string;
  user: {
    displayName: string;
    profilePicture: string;
    userId: 4
  }
  songLikes: boolean;
}

const FeadPage = () => {
    let loggedInUserId = useAppSelector((state) => state.login.userId);

    let [postArray, setPostArray] = useState<PostInfo[]>()


    const getPostsArray = async() => {
        console.log("hit use Effect")
        let getPostsData = await axios.get(`http://localhost:3000/getPosts/${loggedInUserId}`)
        console.log(getPostsData)
        let newPostArray = getPostsData.data.map((post: any) => {

          let songLikes = (post.songLikes[0] !== undefined)

          let newPost = {
            songId: post.songId,
            embeddedLink: post.embeddedLink,
            user: post.user,
            songLikes: songLikes,
          }

          return newPost
        })
        setPostArray(newPostArray)
    }

    useEffect(() => {
        getPostsArray()
    },[])

    console.log(postArray)

  return (
    <div className='size-full'>
    {postArray && postArray.map((post: PostInfo) => {
      return <Post songId={post.songId} user={post.user} embeddedLink={post.embeddedLink} songLikes={post.songLikes} />
    }
    )
    }
    </div>
  )
}

export default FeadPage