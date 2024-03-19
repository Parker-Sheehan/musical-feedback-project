import React, { useEffect } from 'react'
import Post from './Post'
import axios from 'axios'
import { useAppSelector } from '../../store/store'

const FeadPage = () => {
    let loggedInUserId = useAppSelector((state) => state.login.userId);


    const getPostsArray = async() => {
        console.log("hit use Effect")
        let getPostsData = await axios.get(`http://localhost:3000/getPosts/${loggedInUserId}`)
        console.log(getPostsData)
    }

    useEffect(() => {
        getPostsArray()
    },[])

  return (
    <Post/>
  )
}

export default FeadPage