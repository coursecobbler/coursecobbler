import { useState, useEffect, type RefObject} from "react";

export function useCurrentTime(mediaRef: RefObject<HTMLMediaElement | null>):number{
    const [time, setTime] = useState(0);
    useEffect(()=>{

        const media = mediaRef.current;
        if (!media) return;

        const onTimeUpdate= ()=> {
            setTime(media.currentTime);
        }

        media.addEventListener("timeupdate", onTimeUpdate);

        return ()=> {
            media.removeEventListener("timeupdate", onTimeUpdate);
        };


    },[mediaRef]);

    return time;
}
