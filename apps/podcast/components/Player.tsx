type PlayerProps = {
    mediaUrl:string
};

export function Player({mediaUrl}:PlayerProps){
    return <video src={mediaUrl} controls width={640} />
}