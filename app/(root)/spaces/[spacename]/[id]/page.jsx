import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import Link from "next/link";
import React from "react";

const page = async ({ params, searchParams }) => {
  const result = await fetchThreadById(params.id, searchParams.limitSize ? searchParams.limitSize : 0);
  const thread = result.thread
  return (
    <section className="relative custom-scrollbar md:w-[65vw] max-sm:w-[90vw] mb-[10vh] flex flex-col rounded-lg overflow-hidden">
      {thread.parentId ? 
        <Link href={`/spaces/${params.spacename}/${thread.parentId}`} className="text-blue-800/80 text-sm hover:underline mb-[2vh] px-4 py-1 rounded-xl max-w-fit hover:bg-gray-900/70">⟵ Back to Previous</Link>
        : <Link href={`/spaces/${params.spacename}`} className="text-blue-800/80 text-sm hover:underline mb-[2vh] px-4 py-1 rounded-xl max-w-fit hover:bg-gray-900/70">⟵ Back to Space</Link>
      }
      <ThreadCard thread={thread} spacename={params.spacename} isComment={false} tCL={result.totalCommentsLength}/>
      {thread?.thread_comments.length > 0 && thread.thread_comments.map((comment)=>{
        return(
          <ThreadCard key={comment._id} thread={comment} spacename={params.spacename} isComment={true}/>
        )
      })}
      {result.hasMore && <Link href={`/spaces/${params.spacename}/${params.id}?limitSize=${thread.thread_comments.length}`} className="text-xs py-2 font-regular text-blue-800/80 hover:underline">Load More...</Link>}
    </section>
  );
};

export default page;
