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
          <div className='h-3/4 w-full pl-4 flex flex-col justify-evenly sm:items-center'>
          
          <div className=' sm:left-12 w-5/6 sm:w-3/5 lg:w-2/5 xl:w-3/5 xl:h-5/6 bg-prim aspect-square xl:aspect-auto rounded-xl'>
          <div className='relative left-1/3 top-2/3 w-4/5 lg:w-4/5 xl:w-4/5 xl:h-4/5 bg-sec aspect-square xl:aspect-auto rounded-xl'>
            <h1 className=' relative -left-20  -top-20 text-black text-6xl'>Melotika</h1>
            <h1 className=' relative -left-16  -top-24 whitespace-nowrap text-black text-2xl'>Social Platform</h1>
            <h1 className=' relative -left-14  -top-28 whitespace-nowrap text-black text-2xl'>For Music Producers</h1>



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