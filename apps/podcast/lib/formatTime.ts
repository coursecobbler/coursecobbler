export function formatTime(seconds:number):string{
    
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

    const minutes = Math.floor(seconds/60);
    const secs = Math.floor(seconds%60);
    const formattedSecs = String(secs).padStart(2, "0");
    return `${minutes}:${formattedSecs}`;
}
