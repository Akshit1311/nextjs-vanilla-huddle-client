"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { HuddleClient } from "vanilla";
import Video from "./components/Video";

export default function Home() {
  const [camStream, setCamStream] = useState<MediaStream>();

  const [huddleClient, setHuddleClient] = useState<HuddleClient>(
    new HuddleClient()
  );

  const [meId, setMeId] = useState("");

  const [peerCamTracks, setPeerCamTracks] = useState<{
    [key: string]: MediaStreamTrack;
  }>({});

  useEffect(() => {
    huddleClient.on("lobby:joined", (data) => {
      console.log("lobby joined successfully", { data });
    });
    huddleClient.on("app:cam-on", (stream) => {
      console.log("Cam on success", { stream });
    });
    huddleClient.on("peer:media-on", ({ track, peerId, trackType }) => {
      console.log("peer:media-on", { peerId, track, trackType });

      if (trackType === "cam")
        setPeerCamTracks((prev) => ({ ...prev, [peerId]: track }));
    });

    huddleClient.on("peer:media-off", ({ track, peerId, trackType }) => {
      console.log("peer:media-off", { peerId, track, trackType });

      if (trackType === "cam")
        setPeerCamTracks((prev) => {
          const { [peerId]: peer, ...rest } = prev;

          return rest;
        });
    });

    huddleClient.on("room:peer-left", ({ peerId }) => {
      console.log("room:peer-left", { peerId });

      setPeerCamTracks((prev) => {
        const { [peerId]: peer, ...rest } = prev;

        return rest;
      });
    });
  }, []);

  const roomId = "dic-gsxj-gqv";
  const projectId = "KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR";

  const getStream = (_track: MediaStreamTrack) => {
    const stream = new MediaStream();
    stream.addTrack(_track);
    return stream;
  };

  useEffect(() => {
    const id = huddleClient.getPeerId();

    setMeId(id);
  }, []);

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

      <div className="flex gap-4 flex-wrap justify-center">
        <Video peerId={meId || "meId"} stream={camStream} />

        {Object.keys(peerCamTracks).map((key) => (
          <Video
            key={key}
            peerId={key}
            stream={getStream(peerCamTracks[key])}
          />
        ))}
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
          onClick={huddleClient.joinRoom}
          className="bg-blue-500 text-white py-3 px-4 rounded-lg text-xl"
        >
          joinRoom()
        </button>
        <button
          onClick={() => huddleClient.leaveLobby()}
          className="bg-red-500 text-white py-3 px-4 rounded-lg text-xl"
        >
          leaveLobby()
        </button>
        <button
          onClick={() => huddleClient.leaveRoom()}
          className="bg-red-500 text-white py-3 px-4 rounded-lg text-xl"
        >
          leaveRoom()
        </button>
        <button
          onClick={async () => {
            try {
              const stream = await huddleClient.enableCam();
              setCamStream(stream);
            } catch (error) {
              console.log({ error });
            }
          }}
          className="bg-blue-500 text-white py-3 px-4 rounded-lg text-xl"
        >
          enableWebcam()
        </button>

        <button
          onClick={huddleClient.disableCam}
          className="bg-blue-500 text-white py-3 px-4 rounded-lg text-xl"
        >
          disableCam()
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
          stopProducingCam()
        </button>

        <button
          onClick={() => huddleClient.enableMic()}
          className="bg-blue-500 text-white py-3 px-4 rounded-lg text-xl"
        >
          enableMic()
        </button>
        <button
          onClick={() => huddleClient.disableMic()}
          className="bg-blue-500 text-white py-3 px-4 rounded-lg text-xl"
        >
          disableMic()
        </button>
        <button
          onClick={() => huddleClient.produceMic()}
          className="bg-blue-500 text-white py-3 px-4 rounded-lg text-xl"
        >
          produceMic()
        </button>
        <button
          onClick={() => huddleClient.stopProducingMic()}
          className="bg-blue-500 text-white py-3 px-4 rounded-lg text-xl"
        >
          stopProducingMic()
        </button>
      </div>
    </main>
  );
}
