import React from 'react'
import Link from 'next/link'
import { CgMenuGridR } from 'react-icons/cg';
import { MdOutlineArticle } from 'react-icons/md';
import { FaRegComments } from 'react-icons/fa';
export default function AdminSidebar() {
  return (
    <div className='bg-gray-800 text-white md:p-5 w-8 md:w-60 lg:w-60 h-screen flex flex-col items-center gap-2'>
    <Link href="/admin" className="flex items-center text-lg lg:text-2xl font-semibold">
    <CgMenuGridR className="text-3xl me-1" />
    <span className="hidden lg:block">Dashboard</span>
  </Link>
  <ul className="mt-10 flex items-center justify-center flex-col lg:items-start">
    <Link className="flex items-center text-xl mb-5 lg:border-b border-gray-300 hover:border-yellow-200 hover:text-yellow-200 transition" href="/admin/articles-table?pageNumber=1">
      <MdOutlineArticle className="me-1" />
      <span className="hidden lg:block">Articles</span>
    </Link>
    <Link className="flex items-center text-xl mb-5 lg:border-b border-gray-300 hover:border-yellow-200 hover:text-yellow-200 transition" href="/admin/comments-table?pageNumber=1">
      <FaRegComments className="me-1" />
      <span className="hidden lg:block">Comments</span>
    </Link>
  </ul>
  </div>
  )
}
