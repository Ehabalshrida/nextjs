import Link from 'next/link'
import React from 'react'

export default function NotFoundPage() {
  return (
    <div className='flex flex-col gap-5 items-center justify-center container px-4 mx-auto'>
      <h2 className='text-xl font-medium text-amber-700'>404</h2>
      <p className='text-sm font-thin text-amber-400'>Page Not Found</p>
      <Link className='text-bold text-black p-2 rounded-lg hover:bg-slate-200 border-2 border-blue-300 bg-slate-50' href='./'>Back Home</Link>
    </div>
  )
}

