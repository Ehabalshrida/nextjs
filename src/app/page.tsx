import React from 'react'
import Hero from '@/components/home/hero'
import Plan from '@/components/home/plan'

export default function HomePage() {
  console.log('home page')
  return (
    <div>
    <Hero/>
    <div className='text-3xl text-center font-bold text-black my-4'>Choose Your Plan</div>
   <div className="container m-auto flex justify-center items-center my-7 flex-wrap md:gap-7">
    <Plan/>
    <Plan/>
    <Plan/>
   </div>
    </div>
  )
}
