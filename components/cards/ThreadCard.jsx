import Image from "next/image";
import Link from "next/link";
import React from "react";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import LikeThreadButton from "../buttons/LikeThreadButton";
import { redirect } from "next/navigation";
import ReplyForm from "../forms/ReplyForm";

const ThreadCard = async ({ thread, spacename, isComment }) => {
  const user = await currentUser();
  if (!user) redirect("/login");
  const userInfo = await fetchUser(user.id);
  const userID = userInfo._id;
  const isLiked = thread.thread_likes.includes(userID);

  return (
    <div className={` ${isComment && 'pl-4'} max-sm:text-sm font-inter flex flex-col max-sm:min-w-[90vw] bg-gray-900/30`}>
      <article
        key={thread._id}
        className="flex w-full flex-col p-2 xs:px-7"
      >
        <div className="flex items-start justify-between w-full ">
          {isComment && <div className="flex items-end justify-center text-md text-gray-600 mr-2">...</div>}

          <div className="flex w-full flex-1 flex-row gap-4">
            <div className="flex flex-col items-center">
              <Image
                src="/assets/robot.gif"
                alt="user_community_image"
                width={24}
                height={24}
                unoptimized
                className="cursor-pointer rounded-full min-w-[30px] aspect-square"
              />

              <div className="thread-card_bar" />
            </div>

            <div className="flex flex-col w-full">
              <p className="font-inter font-semibold title">
                {thread.thread_author.alias}
              </p>
              <Link
                href={`/spaces/${spacename}/${thread._id}`}
                className="text-sm text-gray-400"
              >
                {thread.thread_content}
              </Link>

              <div className=" flex flex-col select-none">
                <div className={`flex gap-3.5 items-start mb-2 ${!isComment && 'my-2'}`}>
                  <div className="flex flex-col items-center justify-center">
                    <LikeThreadButton
                      threadID={thread._id}
                      isLiked={isLiked}
                      userID={userID}
                    />
                    <p className="text-xs text-gray-600">
                      {thread.thread_likes.length}
                    </p>
                  </div>

                  <Link
                    href={`/spaces/${spacename}/${thread._id}`}
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
                      {thread.thread_comments?.length}
                    </div>
                  </Link>
                </div>
                {!isComment && (
                  <p className="text-[0.5rem] text-gray-300/30 italic ">
                    {thread.createdAt?.toLocaleDateString() +
                      " " +
                      thread.createdAt.toLocaleTimeString()}
                  </p>
                )}
                { !isComment &&
                  <Link href={`/spaces/${spacename}/${thread._id}`}>
                    <p className="text-[0.6rem] py-1 hover:underline text-gray-300">
                      {thread.thread_comments.length} repl
                      {thread.thread_comments.length > 1 ? "ies" : "y"}
                    </p>
                  </Link>
                }
                {!isComment && <ReplyForm userID={userID} parentID={thread._id} />}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ThreadCard;
