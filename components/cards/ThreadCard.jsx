import Image from "next/image";
import Link from "next/link";
import React from "react";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { formatDateString } from "@/lib/utils";
import ThreadInteractiveCard from "./ThreadInteractiveCard";

const ThreadCard = async ({ thread, spacename, isComment, tCL }) => {
  const user = await currentUser();
  if (!user) redirect("/login");
  const userInfo = await fetchUser(user.id);
  const userID = userInfo._id;
  const isLiked = thread.thread_likes.includes(userID);

  return (
    <div className={` ${isComment && 'pl-4'} max-sm:text-sm font-inter flex flex-col max-sm:min-w-[90vw] bg-gray-900/30`}>
      <article
        key={thread._id}
        className={`flex w-full flex-col p-2 xs:px-7 ${isComment && 'py-0'}`}
      >
        <div className="flex items-start justify-between w-full ">
          {isComment && <div className="flex items-end justify-center text-md text-gray-600 mr-2">...</div>}

          <div className="flex w-full flex-1 flex-row gap-4">
            <div className="flex flex-col items-center">
              <Image
                src={`https://robohash.org/${thread.thread_author.alias.split(' ')[0]}.png?set=set4`}
                alt="user_community_image"
                width={28}
                height={28}
                unoptimized
                className="cursor-pointer rounded-full min-w-[30px] aspect-square"
              />

              <div className="thread-card_bar" />
            </div>

            <div className="flex flex-col w-full">
              <p className={`font-inter font-semibold title ${isComment && 'font-[400] text-[0.8rem]'}`}>
                {thread.thread_author.alias}
              </p>
              <Link
                href={`/spaces/${spacename}/${thread._id}`}
                className={`text-sm text-gray-400 ${isComment && 'text-[0.7rem]'}`}
              >
                {thread.thread_content}
              </Link>
              
              { !isComment &&
                <Link href={`/spaces/${spacename}/${thread._id}`}>
                  <p className="text-[0.6rem] py-1 hover:underline text-gray-300">
                    {thread.thread_comments.length} repl
                    {thread.thread_comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              }
              {!isComment && (
                  <p className="text-[0.5rem] text-gray-300/30 italic ">
                      {formatDateString(thread.createdAt)}
                  </p>
                )}

              <ThreadInteractiveCard threadID={thread._id} likes={thread.thread_likes.length} comments={tCL ? tCL : thread.thread_comments.length} isLiked={isLiked} userID={userID} spacename={spacename} isComment={isComment}/>
              </div>
            </div>
          </div>
      </article>
    </div>
  );
};

export default ThreadCard;
