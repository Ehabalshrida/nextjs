import Link from 'next/link';
import React from 'react'
interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}
export default function Pagination({ pages, pageNumber, route }: PaginationProps) {
  const pageArray = [];
  for (let i = 1; i <= pages; i++) {
    pageArray.push(i);
  }
  const prev = pageNumber - 1;
  const next = pageNumber + 1;
  console.log({ pages, pageNumber, route });
  return (
    <div className="flex justify-center items-center w-full md:w-1/2 mx-auto lg:w-1/3 my-5">
         {pageNumber !== 1 &&<Link  href={`${route}/?pageNumber=${prev}`} className='border-2 border-blue-50 py-2 px-4 mx-1 hover:bg-slate-600' >Prev</Link>}
      {pageArray.map((page) => <Link href={`${route}/?pageNumber=${page}`} className={`${pageNumber === page ? "bg-gray-400": ""} border-2 border-blue-50 py-2 px-4 mx-1 transition hover:bg-slate-600`} key={page}>{page}</Link>)}
      {pageNumber !== pages && <Link  href={`${route}/?pageNumber=${next}`}className='border-2 border-blue-50 py-2 px-4 mx-1 hover:bg-slate-600'>Next </Link>}
    </div>
  )
}
