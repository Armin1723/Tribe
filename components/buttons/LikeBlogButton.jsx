"use client"
import { toggleLike } from "@/lib/actions/blog.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";

 const LikeBlogButton = ({ blogID, isLiked, userID }) => {
      const path = usePathname()
      const handleLike = async () => {
            await toggleLike(blogID, userID, path)
          }
  return (
      <button
        className="links flex justify-center"
        onClick={() => handleLike()}
      >
        {isLiked ? (
          <Image
            src="/assets/heart-filled.svg"
            alt="like"
            width={48}
            height={48}
            className="hover:drop-shadow-lg shadow-red-600 cursor-pointer hover:shadow-lg hover:scale-110"
          ></Image>
        ) : (
          <Image
            src="/assets/heart-gray.svg"
            alt="like"
            width={48}
            height={48}
            className="hover:drop-shadow-lg shadow-red-600 cursor-pointer hover:shadow-lg hover:scale-110"
          ></Image>
        )}
      </button>
  );
}

export default LikeBlogButton;
