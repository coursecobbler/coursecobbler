import {BASE_PATH} from "../lib/basePath";
import {Player} from "../components/Player";
export default function PodcastHome(){
    return(
        <main>
            <h1>Podcast</h1>
            <p>Turn your podcast into a full blown scorm course. Quizzes, completion, and all.</p>
            <Player mediaUrl={`${BASE_PATH}/sample.mp4`}/>
        </main>
    );
}