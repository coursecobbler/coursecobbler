// 1. import readFileSync from node:fs
import {readFileSync} from "node:fs";

// 2. read data/cobbler.json as text
const cobblerText = readFileSync("data/cobbler.json","utf8");

// 3. parse it into an object
const cobbler = JSON.parse(cobblerText);
const {id:episodeId, requiredRegions} = cobbler;

// 5. build the folder path: public/thumbs/<episodeId>
// 6. delete that folder if it exists
// 7. create it fresh

for(const region of requiredRegions){
    // 4. log the regions
    console.log(region);

    // 8. for each region: run ffmpeg at region.start → <folder>/<region.id>.jpg
}


