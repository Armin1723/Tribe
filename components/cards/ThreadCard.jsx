import Image from "next/image";
import Link from "next/link";
import React from "react";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import LikeThreadButton from "../buttons/LikeThreadButton";

const ThreadCard = async ({ thread, spacename }) => {
  const user = await currentUser()
  const userInfo = await fetchUser(user.id)
  const userID = userInfo._id
  const isLiked = thread.thread_likes.includes(userID)

  return (
    <div className="my-4 max-sm:text-sm font-inter flex flex-col gap-4 max-sm:min-w-[90vw]">
            <article
              key={thread._id}
              className="flex w-full flex-col rounded-xl p-4 xs:px-7 bg-gray-900/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-2 ">
                  <div className="flex flex-col items-center">
                    <Image
                      src="/assets/robot.gif"
                      alt="user_community_image"
                      width={24}
                      height={24}
                      unoptimized
                      className="cursor-pointer rounded-full min-w-[30px] aspect-square"
                    />

                    <div className="thread-card_bar -mt-4" />
                  </div>

                  <div className="flex flex-col">
                    <p className="font-inter font-semibold title">
                      {thread.thread_author.alias}
                    </p>
                    <Link
                      href={`/spaces/${spacename}/${thread._id}`}
                      className="text-sm text-gray-400"
                    >
                      {thread.thread_content}
                    </Link>

                    <div className="mt-2 flex flex-col gap-3 select-none">
                      <div className="flex gap-3.5 items-start">
                        <div className="flex flex-col items-center justify-center">
                          
                          <LikeThreadButton threadID={thread._id} isLiked={isLiked} userID={userID}/>
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
                      <p className="text-[0.5rem] text-gray-300/30 italic">
                        {thread.createdAt?.toLocaleDateString() +
                          " " +
                          thread.createdAt.toLocaleTimeString()}
                      </p>
                      {thread.thread_comments?.length > 0 && (
                        <Link href={`/thread/${thread._id}`}>
                          <p className="mt-1 text-subtle-medium text-gray-1">
                            {thread.thread_comments.length} repl
                            {thread.thread_comments.length > 1 ? "ies" : "y"}
                          </p>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
    </div>
  );
};

export default ThreadCard;
