"use client"

import { useRef } from "react";
import {useCurrentTime} from  "../hooks/useCurrentTime"
import {useDuration} from  "../hooks/useDuration"
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
    const duration = useDuration(videoRef);
    const progressPercent = time / duration * 100;

    return ( 
        <div className={styles.videoBlock}>
            <video ref={videoRef} src={mediaUrl} controls width={640} />
            <div className={styles.mediaTrackContainer}>
                <div className={styles.mediaTrack}>
                    {duration > 0 && episode.requiredRegions.map((region) => {

                
                const regionStart = region.start/duration * 100;
                const regionWidth = (region.end - region.start) / duration * 100;
                

                return (
                    <div key={region.id} className={`${styles.mandatoryRegion} ${styles.mediaTrackAttribute}`} style={{left:`${regionStart}%`, width:`${regionWidth}%`}}></div>
                );
            })}
                   {duration > 0 && (
                     <div className={`${styles.mediaTrackProgress} ${styles.mediaTrackAttribute}`} style={{width:`${progressPercent}%`}}></div>
                   )}
                </div>
            </div>
            <p>Time: {formatTime(time)}</p>
            <p>Total Duration: {formatTime(duration)}</p>
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
