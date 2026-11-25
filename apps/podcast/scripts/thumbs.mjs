// 1. import readFileSync from node:fs
import {readFileSync, mkdirSync, rmSync} from "node:fs";
import {execFileSync} from "node:child_process";

// 2. read data/cobbler.json as text
const cobblerText = readFileSync("data/cobbler.json","utf8");

// 3. parse it into an object
const cobbler = JSON.parse(cobblerText);
const {id:episodeId, mediaFile, requiredRegions} = cobbler;

// 4. build the folder path: public/thumbs/<episodeId>
const folderPath = `public/thumbs/${episodeId}`;
// 5. delete that folder if it exists
rmSync(folderPath, { recursive: true, force: true });
// 6. create it fresh
mkdirSync(folderPath, { recursive: true });

for(const region of requiredRegions){
    // 7. for each region: run ffmpeg at region.start → <folder>/<region.id>.jpg
    const ffmpegArg = [ "-hide_banner", "-loglevel", "error",  "-ss", `${region.start}`, "-i", `public/${mediaFile}`, "-frames:v", "1", "-update", "1", "-vf", "scale=160:-1", `${folderPath}/${region.id}.jpg`];
    execFileSync("ffmpeg",ffmpegArg);
    console.log(`✓ ${region.id}.jpg`);
 
}


