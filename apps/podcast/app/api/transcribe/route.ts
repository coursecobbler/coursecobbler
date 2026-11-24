import {refineSegments} from "../../../lib/refineSegments"

export async function POST(request: Request) {

    const hasKey = Boolean(process.env.GROQ_API_KEY);


    

    if(!hasKey){
        return Response.json({ error: "Missing API Key" }, { status: 500 });
    }
    // 1. read the incoming form data, get "file"
    const incomingData = await request.formData();
    const mediaFile = incomingData.get("file");

    if(!(mediaFile instanceof File )){
        return Response.json({ error: "No file found" }, { status: 400 });
    }



    // 2. build a NEW FormData for Groq with:
    //      file   → the file you just received
    //      model  → "whisper-large-v3-turbo"
    //      response_format → "verbose_json"   (this is what gives timestamped segments)
    const groqForm = new FormData();
    groqForm.append("file", mediaFile);
    groqForm.append("model", "whisper-large-v3-turbo");
    groqForm.append("response_format", "verbose_json");
    groqForm.append("timestamp_granularities[]","word");
    groqForm.append("timestamp_granularities[]","segment");

    

    // 3. fetch Groq's endpoint, POST, with the header:
    //      Authorization → `Bearer ${process.env.GROQ_API_KEY}`
     const groqRes = await fetch("https://api.groq.com/openai/v1/audio/transcriptions",{
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
        body: groqForm,
    }); 


    if(!groqRes.ok){
        const errorText = await groqRes.text();
        console.error("Groq error:",groqRes.status, errorText);
        return Response.json(
            {
                error:"Groq error:", 
                detail: errorText, 
            }, 
            { 
                status: groqRes.status
            }
        );
    }
    // 4. check ok, read Groq's JSON
    const groqResponse = await groqRes.json();
    const refined = refineSegments(groqResponse.segments, groqResponse.words);
    // 5. return it to the browser

    
    return Response.json(refined);

}
