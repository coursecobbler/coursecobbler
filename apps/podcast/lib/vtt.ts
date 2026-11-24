export function vttFormatTime(seconds:number):string{
    
    if (!Number.isFinite(seconds) || seconds < 0) return "00:00:00.000";

    const milliseconds = Math.round(seconds*1000);

    const hours = Math.floor(milliseconds /3600000);
    const hoursRemainder = milliseconds%3600000;
    const minutes = Math.floor(hoursRemainder/60000);
    const minutesRemainder = hoursRemainder%60000;
    const secs = Math.floor( minutesRemainder/1000);
    const mills = minutesRemainder%1000;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSecs = String(secs).padStart(2, "0");
    const formattedMills = String(mills).padStart(3, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSecs}.${formattedMills}`;
}
