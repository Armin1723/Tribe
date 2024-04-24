'use client'
import React from "react";
import ReplyForm from "../forms/ReplyForm";
import Image from "next/image";
import LikeThreadButton from "../buttons/LikeThreadButton";
import { playClick } from "@/lib/utils";

const ThreadInteractiveCard = ({threadID, likes, comments, isLiked, userID, isComment}) => {
    const [ open, setOpen ] = React.useState(!isComment)
    const handleOpen = () => {
        playClick()
        setOpen(!open)
    }
  return (
    <div className=" flex flex-col select-none">
      <div className={`flex gap-3.5 items-start mb-2 ${!isComment && "my-2"}`}>
        <div className="flex flex-col items-center justify-center">
          <LikeThreadButton
            threadID={threadID}
            isLiked={isLiked}
            userID={userID}
          />
          <p className="text-xs text-gray-600">{likes}</p>
        </div>

        <div onClick={handleOpen}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src="/assets/reply.svg"
            alt="heart"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
          <div className="text-xs text-gray-600">
            {comments}
          </div>
        </div>
      </div>

      {open && <ReplyForm userID={userID} parentID={threadID} setOpen={setOpen}/>}
    </div>
  );
};

export default ThreadInteractiveCard;
