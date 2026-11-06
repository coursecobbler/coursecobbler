export function toPercent(value:number, total:number):number{
    
    if (!Number.isFinite(value) || value < 0 || !Number.isFinite(total) || total <= 0) return 0;

    return Math.min(100, value / total * 100);
}
