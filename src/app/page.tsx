"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { HuddleClient } from "vanilla";

export default function Home() {
  const [camStream, setCamStream] = useState<MediaStream>();

  const [huddleClient, setHuddleClient] = useState<HuddleClient>(
    new HuddleClient()
  );

  const videoRef = useRef<HTMLVideoElement>(null);

  const roomId = "dic-gsxj-gqv";
  const projectId = "KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Project ID: {projectId}
        </p>
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Room ID: {roomId}
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div>
        <div className="overflow-hidden bg-zinc-950 rounded-xl aspect-video h-64">
          <video
            className="w-full h-full object-cover"
            ref={videoRef}
            autoPlay
            muted
          ></video>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 gap-4 lg:text-left">
        <button
          onClick={() => {
            huddleClient.initialize(projectId);
            huddleClient.joinLobby(roomId);
          }}
          className="bg-blue-500 text-white py-3 px-4 rounded-lg text-xl"
        >
          joinLobby()
        </button>
        <button
          onClick={async () => {
            try {
              const stream = await huddleClient.enableCam();
              setCamStream(stream);

              if (videoRef.current) {
                console.log({ stream });

                videoRef.current.srcObject = stream;
              }
            } catch (error) {
              console.log({ error });
            }
          }}
          className="bg-blue-500 text-white py-3 px-4 rounded-lg text-xl"
        >
          enableWebcam()
        </button>
        <button
          onClick={huddleClient.joinRoom}
          className="bg-blue-500 text-white py-3 px-4 rounded-lg text-xl"
        >
          joinRoom()
        </button>
        <button
          onClick={() => huddleClient.produceCam()}
          className="bg-blue-500 text-white py-3 px-4 rounded-lg text-xl"
        >
          produceCam()
        </button>
        <button
          onClick={() => huddleClient.stopProducingCam()}
          className="bg-blue-500 text-white py-3 px-4 rounded-lg text-xl"
        >
          stopProducing()
        </button>
      </div>
    </main>
  );
}
