import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import React from "react";

const page = async ({ params }) => {
  const thread = await fetchThreadById(params.id);
  return (
    <section className="relative md:w-[65vw] max-sm:w-[100vw]">
      <ThreadCard thread={thread} spacename={params.spacename}/>
    </section>
  );
};

export default page;
