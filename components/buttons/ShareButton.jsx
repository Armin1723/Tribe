'use client'
import { usePathname } from "next/navigation";
import Image from "next/image"
import React from "react";
import {RWebShare} from "react-web-share";

const ShareButton = ({title, text}) => {
    const path = usePathname()
  return (
    <RWebShare
      data={{
        text: text,
        title: title,
        url: 'https://localhost:3000/' + path
      }}
    >
      <Image src='/assets/share.svg' alt='share button' width={48} height={48} className="cursor-pointer hover:opacity-75"/>
    </RWebShare>
  );
};

export default ShareButton;
