"use client"

import { useRef } from "react";
import {useCurrentTime} from  "../hooks/useCurrentTime"
import {formatTime} from "../lib/formatTime";
import type {Episode} from "../lib/episode.ts"

type PlayerProps = {
    episode:Episode;
    mediaUrl:string;
};

export function Player({mediaUrl}:PlayerProps){
    const videoRef = useRef<HTMLVideoElement>(null);
    const time = useCurrentTime(videoRef);

    return ( 
        <div>
            <video ref={videoRef} src={mediaUrl} controls width={640} />
            <p>Time: {formatTime(time)}</p>
        </div>
    );
}
