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
        <main className=' size-full flex justify-center items-center'>
          <div className='h-full w-1/2 bg-red-400'>
          
          <div className='relative left-12 top-12 w-[36rem] bg-prim aspect-square rounded-xl'>
          <div className='relative left-1/2 top-1/2 w-[24rem] bg-sec aspect-square rounded-xl'></div>
          </div>
          </div>
        </main>
    )}
    </>
  )
}

export default Home