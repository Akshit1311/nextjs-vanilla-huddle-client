"use client";
import React, { useEffect, useRef } from "react";

interface Props {
  stream?: MediaStream;
  peerId: string;
}

const Video = ({ stream, peerId }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      console.log({ stream });

      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="overflow-hidden bg-zinc-950 rounded-xl aspect-video h-64 relative">
      {stream ? (
        <video
          className="w-full h-full object-cover"
          ref={videoRef}
          autoPlay
          muted
        ></video>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          No stream found
        </div>
      )}
      <div className="text-red-500 absolute bottom-3 right-3 text-xl font-bold bg-white">
        {peerId}
      </div>
    </div>
  );
};

export default Video;
