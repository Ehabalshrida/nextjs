'use client'
import Link from 'next/link'
import React from 'react'
type Props = {
    error: Error,
    reset(): void
}
export default function AricleError({error, reset}: Props) {
  return (
    <div className='container mx-auto text-center flex flex-col items-center justify-center gap-3'>
     <div> Errors comes from article</div>
      <div className='text-xl font-bold text-red-700'>Error</div>
      <div className='text-xl font-bold text-red-950'>{error.message}</div>
      <div>
      <button className="text-xl bg-blue-500 hover:bg-blue-700 text-center text-white py-2 px-4 font-light rounded-full" onClick={()=> reset()}>Try again</button>
      </div>
      <Link className="text-xl font-bold underline text-yellow-900" href="./">Home</Link>
    </div>
  )
}

