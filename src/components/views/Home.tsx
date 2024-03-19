import React from 'react'
import { useAppSelector } from '../../store/store'
import FeadPage from './FeadPage';

const Home = () => {
    let loggedInUserId = useAppSelector((state) => state.login.userId);


  return (
    <>
    {loggedInUserId ? 
    (
        <FeadPage/>
    )
    : 
    (
        <h1>
            splash
        </h1>
    )}
    </>
  )
}

export default Home