"use client";

import { useState } from "react";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import DappChat from "@/public/assets/DappChat.png";
import Features from "@/components/Features";
import AccountModal from "@/components/ui/AccountModal";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <>
      <div className="home min-h-screen flex flex-col md:flex-row justify-center md:space-y-12 md:space-x-[12] mt-20 md:mt-2">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[190px] font-bold">X<span className="bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-600  text-transparent bg-clip-text">-KAPS</span></h1>
        <div className="overflow-hidden">
        <p className="text-2xl font-bold hover:text-amber-100" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Your Decentralised-Messaging Application</p>
        <div className={` ${isHovered ? "w-full" : "w-0.5"} transition-all duration-300 ease-in-out h-0.5 bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-600`}></div>
        </div>
        <button className="mt-20 bg-purple-600 py-4 px-6 rounded-3xl hover:bg-purple-800" onClick={() => setOpenModal(true)}>Get Started</button>
        
      </div>

        {openModal && <AccountModal setOpenModal={setOpenModal} />}

        <div className="flex flex-row max-w-1xl md:max-w-5xl mx-10">
          {/* <Image
            className="img-shadow rounded-xl"
            width={800}
            height={700}
            src={DappChat}
            alt="Decentralized-Messaging"
            priority
          /> */}
        </div>
      </div>
      <Heading className="flex justify-center my-5">Features</Heading>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <Features />
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
