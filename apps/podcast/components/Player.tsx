"use client"

import { useState, useRef } from "react";

type PlayerProps = {
    mediaUrl:string
};

export function Player({mediaUrl}:PlayerProps){
    const [time, setTime] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    function showTime(){
        console.log(videoRef.current?.currentTime);
    };
    return  <div>
                <video ref={videoRef} src={mediaUrl} controls width={640} />
                <p>Time: {time}s</p>
                <button onClick={showTime}>Log Time</button>
            </div>
}
