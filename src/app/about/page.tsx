import React from 'react'
// import Image from 'next/image'
// Image: it will reduce image size and optimize it
// import CloudImage from '../../../public/cloud-hosting.png'
import type { Metadata } from "next";
// to apply metadata to the page, we need to export a metadata object from the page file
export const metadata: Metadata = {
  title: "About",
  description: "About page",
};

export default function About() {
  // throw new Error('Error in About page')
  return (
    <div className='text-center w-full'>
     <section className="container m-auto">
      <h1 className="text-3xl font-bold text-gray-800 p-5">
        About This App
      </h1>
      <p className="px-5 text-gray-600 text-xl">
        The best web hosting solution for your online success
      </p>
    </section>
    {/* <Image 
    src={CloudImage}
    alt="Cloud Hosting"
    width={500}
    height={500}
    priority></Image> */}
    </div>
  )
}
//  priority prop is used to prioritize the image loading, so will load image before content
// by default it is false, so image will load after content, which is lazy loading