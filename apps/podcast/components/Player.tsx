"use client"

import { useRef } from "react";
import {useCurrentTime} from  "../hooks/useCurrentTime"
import {formatTime} from "../lib/formatTime";
import type {Episode} from "../lib/episode"
import styles from "./Player.module.css"

type PlayerProps = {
    episode:Episode;
    mediaUrl:string;
};

export function Player({mediaUrl, episode}:PlayerProps){
    const videoRef = useRef<HTMLVideoElement>(null);
    const time = useCurrentTime(videoRef);

    return ( 
        <div>
            <video ref={videoRef} src={mediaUrl} controls width={640} />
            <p>Time: {formatTime(time)}</p>
            <ul>
            {episode.requiredRegions.map((region) => {

                const isActive = time >= region.start && time <= region.end;

                return (
                <li key={region.id} className={isActive ? styles.regionActive : styles.region}>
                    {region.label}: {formatTime(region.start)}–{formatTime(region.end)}
                </li>
                );
            })}
            </ul>
            
            
        </div>
    );
}
