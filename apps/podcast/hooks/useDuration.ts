import { useState, useEffect, type RefObject} from "react";

export function useDuration(mediaRef: RefObject<HTMLMediaElement | null>):number{
    const [duration, setDuration] = useState(0);
    useEffect(()=>{

        const media = mediaRef.current;
        if (!media) return;

        const onLoadedMetadata= ()=> {
            setDuration(media.duration);
        }

        media.addEventListener("loadedmetadata", onLoadedMetadata);

        return ()=> {
            media.removeEventListener("loadedmetadata", onLoadedMetadata);
        };


    },[mediaRef]);

    return duration;
}
