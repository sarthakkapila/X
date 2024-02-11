import React, { use, useCallback } from "react";
import { FaU, FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import { graphQLClient } from "@/clients/api";
import { verifyGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import FeedCard from "@/components/FeedCard";
import { BiImageAlt } from "react-icons/bi";

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
  const { user } = useCurrentUser();
  const queryClient =  useQueryClient();

  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    if(!googleToken) return toast.error("Google login failed");

    const {verifyGoogleToken} = await graphQLClient.request(
      verifyGoogleTokenQuery, 
      {token: googleToken}
      );
      
      toast.success('Verified Sucessfully!')
      console.log(verifyGoogleToken)

      if(verifyGoogleToken) 
      window.localStorage.setItem("__X_token", verifyGoogleToken)

      await queryClient.invalidateQueries(["current-user"]);
  }, [queryClient]);

  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      <div className="col-span-3 flex items-start justify-center p-8 relative">
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
          <button className="bg-blue-400 text-white rounded-full p-2 text-lg w-full">
            Post
            </button>
        </div>
      </div>
            <div className="mt-5 absolute bottom-5 flex gap-2 items-center bg-slate-800 px-2 py-2 rounded-full">
              {user && user.profileimageURL && <img
              src={user.profileimageURL} 
              alt="profile" width={50} height={50} 
              className="rounded-full" />}
              <h3 className="text-l">{
              !user?.FirstName && user?.email.split("@")[0] || user?.FirstName
              }</h3>
              <h3 className="text-xl">{user?.__typename}</h3>
            </div>
      </div>
      <div className="col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">
      <div className="col-span-11">
        <textarea
        className="w-full bg-transparent text-xl px-5 py-5 border-b border-slate-800"
        placeholder="Whats Happening?"
        rows={1}
        style={{ resize: "none" }}/>
      <div className="flex items-center justify-between w-full gap-2 py-2">
      <button
        className="text-xl rounded-full p-2 hover:bg-gray-800 cursor-pointer"
      >
        <BiImageAlt />
      </button>
      <button
        className="bg-blue-400 text-white px-4 py-2 rounded-full"
      >
        Post
      </button>
      </div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>     
        </div>
      <div className="col-span-3 p-5">
        {!user && (
        <div className="p-6 bg-slate-700 rounded-lg">
          <h1>New to X?</h1>
        <GoogleLogin onSuccess={(handleLoginWithGoogle)}/>
        </div>
        )}
      </div>
    </div>
  );
}