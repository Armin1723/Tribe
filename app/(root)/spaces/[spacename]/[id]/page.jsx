import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import Link from "next/link";
import React from "react";

const page = async ({ params }) => {
  const thread = await fetchThreadById(params.id);
  return (
    <section className="relative custom-scrollbar md:w-[65vw] max-sm:w-[90vw] mb-[10vh] flex flex-col">
      {thread.parentId && <Link href={`/spaces/${params.spacename}/${thread.parentId}`} className="text-blue-800/80 text-sm hover:underline mb-[2vh] px-4 py-1 rounded-xl max-w-fit hover:bg-gray-900/70">⟵ Back to Previous</Link>}
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
