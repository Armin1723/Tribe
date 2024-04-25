"use client";

import { acceptRequest, deleteRequest } from "@/lib/actions/space.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SpaceActionButton = ({ spacename, userId }) => {
  const [disabled, setDisabled] = useState(false);
  const path = usePathname();
  const handleRequest = async (e, role) => {
    e.preventDefault();
    setDisabled(true);
    if (role === "accept") await acceptRequest(spacename, userId, path);
    if (role === "delete") await deleteRequest(spacename, userId, path);
  };
  return (
    <div className="flex gap-2 items-center justify-center">
      {!disabled ? (
        <>
          <button
            onClick={(e) => handleRequest(e, "accept")}
            disabled={disabled}
            className="rounded-md hover:opacity-75 bg-gradient-to-br from-green-600/90 px-2 h-1/2"
          >
            ✓<span className="max-sm:hidden px-1">Accept</span>
          </button>
          <button
            onClick={(e) => handleRequest(e, "delete")}
            disabled={disabled}
            className="rounded-md hover:opacity-75 bg-gradient-to-br from-red-600/90 px-2 h-1/2"
          >
            X<span className="max-sm:hidden px-1">Delete</span>
          </button>
        </>
      ) : (
        <Image
          src="/assets/spinner.svg"
          alt="loading"
          width={24}
          height={24}
          className="mx-10"
        />
      )}
    </div>
  );
};

export default SpaceActionButton;
