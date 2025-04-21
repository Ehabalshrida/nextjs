import React from 'react'

export default function Footer() {
  return (
    <div className='flex flex-col items-center justify-center p-4 bg-slate-500 text-black w-full mt-3' style={{ height: '100px'}}>
    <p>&copy; {new Date().getFullYear()} Next Course. All rights reserved.</p>
    </div>
  )
}
