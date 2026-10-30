import {BASE_PATH} from "../lib/basePath";
import {Player} from "../components/Player";
import type {Episode} from "../lib/episode.ts";
import episodeData from "../data/episode.json";

const episode:Episode = episodeData;

export default function PodcastHome(){
    return(
        <main>
            <h1>{episode.title}</h1>
            <p>Turn your podcast into a full blown scorm course. Quizzes, completion, and all.</p>
            <Player episode={episode} mediaUrl={`${BASE_PATH}/${episode.mediaFile}`}/>
        </main>
    );
}
