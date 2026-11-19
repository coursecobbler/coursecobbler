"use client"

import { useRef } from "react";
import {useCurrentTime} from  "../hooks/useCurrentTime"
import {useDuration} from  "../hooks/useDuration"
import {formatTime} from "../lib/formatTime";
import {toPercent} from "../lib/toPercent";
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
    const progressPercent = toPercent(time, duration);

    const handleGenerate = async () => {
            //    (wrapped in try/catch → console.error)
             try {
                        // 1. fetch the video from mediaUrl
                    const res = await fetch(mediaUrl); 
                        // 2. check res.ok (fetch doesn't throw on 404/500)
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);  
                        // 3. get the response as a Blob
                    const videoBlob = await res.blob();                 
                        // 4. log the blob's size and type
                    console.log("Blob size:",videoBlob.size, "| Blob type:",videoBlob.type, "media url:",mediaUrl);
                        // 5. create a FormData and append the blob under the field name "file"
                    const formData = new FormData();
                    const mediaName = episode.mediaFile;
                    formData.append("file", videoBlob, mediaName );

                            // 6. POST it to /podcast/api/transcribe  (fetch with method + body)
                        const uploadRes = await fetch("/podcast/api/transcribe", {
                            method: "POST",
                            body: formData,
                        });

                        if (!uploadRes.ok) throw new Error(`HTTP ${uploadRes.status}`);
                        const groqResponse = await uploadRes.json();
                            // 7. read the route's JSON response and log it
                        console.log("route said:",groqResponse);
                    
                    
                
                } catch (err) {
                    console.error("load failed:", err);            // network errors + your thrown error land here
                }
    }

    return ( 
        <div className={styles.videoBlock}>
            <video ref={videoRef} src={mediaUrl} controls width={640} />
            <div className={styles.mediaTrackContainer}>
                <div className={styles.mediaTrack}>
                    {duration > 0 && episode.requiredRegions.map((region) => {

                
                const regionStart = toPercent(region.start,duration);
                const regionWidth = toPercent( (region.end - region.start),duration);
                

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
            <button onClick={handleGenerate}>Generate transcript</button>
            
            
        </div>
    );
}
