// 1. import type { Segment, Word } from "./transcript"
import type {Segment, Word} from "./transcript";

// 2. export function refineSegments(segments: Segment[], words: Word[]): Segment[]
export function refineSegments(segments:Segment[], words:Word[]):Segment[]{

    // 3. a running position into words, starting at 0
    let wordIndex = 0;
    const refined: Segment[] = [];

    // 4. for each segment:
        //      a. count its words: trim the text, split on spaces, take the length
        //      b. slice that many words starting at the position
        //      c. if none found → keep the segment as is
        //      d. otherwise → new segment: same text, start = first word's start, end = last word's end
        //      e. move the position forward by the count
    let segmentStart:number = 0;
    let segmentEnd:number = 0;     
    for (const segment of segments){
        const count = segment.text.trim().split(" ").length;
        const segmentWords = words.slice(wordIndex, wordIndex + count);
        
        if(segmentWords.length > 0){
            segmentStart = segmentWords[0].start;
            segmentEnd = segmentWords[segmentWords.length - 1].end; 
        }else{
            segmentStart = segment.start;
            segmentEnd = segment.end;  
        }
        refined.push({text:segment.text.trim(),start:segmentStart,end:segmentEnd});
        wordIndex += count;
    }

    // 5. return the refined segments
        // (later: second pass to trim overlaps)
    return refined;

}
