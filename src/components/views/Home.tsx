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
        <main className=' size-full'>
          <div className='h-3/4 w-full pl-4 flex flex-col justify-evenly'>
          
          <div className=' md:left-12 w-5/6 bg-prim aspect-square rounded-xl'>
          <div className='relative left-1/3 top-2/3 w-10/12 bg-sec aspect-square rounded-xl'>
            <h1 className=' relative -left-20  -top-20 font-heading text-black text-6xl'>Melotika</h1>
            <h1 className=' relative -left-16  -top-24 whitespace-nowrap font-heading text-black text-2xl'>Social Platform</h1>
            <h1 className=' relative -left-14  -top-28 whitespace-nowrap  font-heading text-black text-2xl'>For Music Producers</h1>



          </div>
          </div>
          </div>
          <div></div>
        </main>
    )}
    </>
  )
}


export default Home