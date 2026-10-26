"use client"

import { useState, useRef, useEffect } from "react";

type PlayerProps = {
    mediaUrl:string
};

export function Player({mediaUrl}:PlayerProps){
    const [time, setTime] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(()=>{
        const video = videoRef.current;
        if (!video) return;

        const onTimeUpdate= ()=> {
            setTime(video.currentTime);
        }

        video.addEventListener("timeupdate", onTimeUpdate);

        return ()=> {
            removeEventListener("timeupdate", onTimeUpdate);
        };

    }, []);

   /* function showTime(){
        console.log(videoRef.current?.currentTime);
    };
    */
    return  <div>
                <video ref={videoRef} src={mediaUrl} controls width={640} />
                <p>Time: {time}s</p>
            </div>
}
