import React from "react";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { useCurrentUser } from "@/hooks/user";
import { Tweet } from "@/gql/graphql";
import { useGetAllTweets } from "@/hooks/tweets";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps>= (props) => {
    const { user } = useCurrentUser();
    const { data } = useGetAllTweets();
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
        {user && user.profileimageURL && <img
              src={user.profileimageURL} 
              alt="profile" width={50} height={50} 
              className="rounded-full" />}
              
        </div>
        <div className="col-span-11">
          <h5>{
              !user?.FirstName && user?.email.split("@")[0] || user?.FirstName
              }</h5>
          <p>
            {props.data.content}
          </p>
          <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;