// 1. import readFileSync from node:fs
import {readFileSync, mkdirSync, rmSync} from "node:fs";

// 2. read data/cobbler.json as text
const cobblerText = readFileSync("data/cobbler.json","utf8");

// 3. parse it into an object
const cobbler = JSON.parse(cobblerText);
console.log(cobbler);
const {id:episodeId, requiredRegions} = cobbler;

// 5. build the folder path: public/thumbs/<episodeId>
const folderPath = `public/thumbs/${episodeId}`;
console.log(folderPath);
// 6. delete that folder if it exists
rmSync(folderPath, { recursive: true, force: true });
// 7. create it fresh
mkdirSync(folderPath, { recursive: true });

for(const region of requiredRegions){
    // 4. log the regions
    console.log(region);

    // 8. for each region: run ffmpeg at region.start → <folder>/<region.id>.jpg
}


