"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";  
export default function SearchField() {
  const [searchData, setSearchData] = useState("");
  const router = useRouter();
  const handleSearchData = (value: string) => {
      console.log(value)
    setSearchData(value);
};
const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ searchData });
    router.push(`/articles/search?searchData=${searchData}`);
};
  return (
    <form onSubmit={handleSubmitForm} className="flex justify-center items-center w-full md:w-1/2 mx-auto lg:w-1/3 my-5">
           <input type="search" onChange={(e)=>handleSearchData(e.target.value)} value={searchData} placeholder="Search" className="border-2 border-gray-300 p-2 rounded-lg w-full"/>
    </form>
  );
}
