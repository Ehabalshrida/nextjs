'use client'
import Link from 'next/link'
import React from 'react'
type Props = {
    error: Error,
    reset(): void
}
export default function error({error, reset}: Props) {
  return (
    <div className='container mx-auto text-center flex flex-col items-center justify-center gap-3'>
      <div className='text-xl font-bold text-red-700'>Error</div>
      <div className='text-xl font-bold text-red-950'>{error.message}</div>
      <div>
        {/* reset: is a method of error object we can use it to re-render the component which
        raised an error in, to check if it passed */}
      <button className="text-xl bg-red-500 hover:bg-red-700 text-center py-2 px-4 font-semibold rounded-full" onClick={()=> reset()}>Try again</button>
      </div>
      <Link className="text-xl font-bold underline" href="./">Home</Link>
    </div>
  )
}

