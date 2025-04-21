import React from "react";
import CloudImage from "../../../public/cloud-hosting.png";
import Image from "next/image";

import { TiTick } from "react-icons/ti";
export default function Hero() {
  return (
    <div className="hero flex flex-row items-center justify-evenly flex-wrap gap-7">
      <div className="heroLeft flex flex-col gap-5 items-start justify-start">
        <div className="title text-3xl font-bold text-black">Next Project</div>
        <div className="des text-2xl font-medium text-slate-500">To gain next knowledge</div>
        <div className="services text-xl text-slate-400 font-light flex flex-col items-start justify-start gap-5">
            <div className="serviceItem flex flex-row items-center justify-start">
                <TiTick/> start from zero
            </div>
            <div className="serviceItem flex flex-row items-center justify-start">
            <TiTick/> apply tailwind css
            </div>
            <div className="serviceItem flex flex-row items-center justify-start">
            <TiTick/> real time project
            </div>
        </div>
      </div>
      <div className="heroRight">
        <Image
          src={CloudImage}
          alt="Cloud Hosting"
          width={500}
          height={500}
        ></Image>
      </div>
    </div>
  );
}
