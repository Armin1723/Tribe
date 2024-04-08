"use client"
import { toggleLike } from "@/lib/actions/blog.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import useSound from "use-sound";


 const LikeBlogButton = ({ blogID, isLiked, userID }) => {
      const [play] = useSound("/assets/like.mp3",{ volume: 1 })
      const [ liked, setLiked ] = useState(isLiked)
      const path = usePathname()
      const handleLike = async () => {
            if(!liked)  play()
            setLiked(!liked)
            await toggleLike(blogID, userID, path)
          }
  return (
      <button
        className="links flex justify-center"
        onClick={() => handleLike()}
      >
        {liked ? (
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
