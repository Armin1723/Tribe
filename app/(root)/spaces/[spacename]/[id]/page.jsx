import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import React from "react";

const page = async ({ params }) => {
  const thread = await fetchThreadById(params.id);
  return (
    <section className="relative custom-scrollbar md:w-[65vw] max-sm:w-[90vw] mb-[10vh]">
      <ThreadCard thread={thread} spacename={params.spacename} isComment={false}/>
      {thread?.thread_comments.length > 0 && thread.thread_comments.map((comment)=>{
        return(
          <ThreadCard key={comment._id} thread={comment} spacename={params.spacename} isComment={true}/>
        )
      })}
    </section>
  );
};

export default page;
