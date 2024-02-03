import React from "react";
import { FaU, FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";

interface sidebarItems {
  icon: React.ReactNode;
  text: string;
}
const sidebarItems: sidebarItems[] = [
  {
    icon: <GoHomeFill />,
    text: "Home",
  },
  {
    icon: <FaSearch/>,
    text: "Explore",
  },
  {
    icon: <FaBell />,
    text: "Notifications",
  },
  {
    icon: <IoMail />,
    text: "Messages",
  },
  {
    icon: <FaBookmark />,
    text: "Bookmarks",
  },
  {
    icon: <MdVerified />,
    text: "Premium",
  },
  {
    icon: <FaUser />,
    text: "Profile",
  },
  {
    icon: <CiCircleMore />,
    text: "More",
  },
];

export default function Home() {
  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      <div className="col-span-3 flex items-start justify-center p-8">
        <FaXTwitter className="text-4xl h-fit hover:bg-gray-900 rounded-full cursor-pointer transition-all"/>
        <div className="flex flex-col gap-4 mt-10">
        <ul className="mt-10">
          {sidebarItems.map((item) => (
            <li className="flex justify-start items-center gap-6 text-2xl hover:bg-gray-900 rounded-full">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <button className="bg-blue-400 text-white rounded-full p-2 text-lg w-full">Tweet</button>
        </div>
      </div>
      </div>
      <div className="col-span-6 border-x-[1px] border-white"></div>
      <div className="col-span-3"></div>
    </div>
  );
}
