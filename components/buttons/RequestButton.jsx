"use client";

import { sendRequest } from "@/lib/actions/space.actions";
import { playClick } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestButton = ({ spaceId, requestPending }) => {
  const [sent, setSent] = useState(false);
  const path = usePathname();

  const handleRequest = async () => {
    setSent(!sent);
    playClick();
    const id = toast.loading("Sending Request...", { theme: "dark" });
    await sendRequest(spaceId, path);
    toast.update(id, {
      render: "Request sent",
      type: "success",
      isLoading: false,
      theme: "dark",
      autoClose: 2000,
      closeOnClick: true,
    });
    setSent(!sent);
  };
  return (
    <>
      {!sent ? (
        <button
          onClick={() => handleRequest()}
          disabled={requestPending}
          className="flex justify-center max-sm:w-full items-center bg-gradient-to-br from-green-400/80 to-green-700/40 hover:opacity-75 rounded-lg max-sm:text-xs px-6 py-2 h-1/2"
        >
          Join
        </button>
      ) : (
        <Image
          src="/assets/spinner.svg"
          alt="loading"
          width={24}
          height={24}
          className="mx-10"
        />
      )}
    </>
  );
};

export default RequestButton;
