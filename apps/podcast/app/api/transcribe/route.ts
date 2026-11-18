export async function POST(request: Request) {

    const hasKey = Boolean(process.env.GROQ_API_KEY);

    console.log("key present:", hasKey);

    return Response.json({ ok: true });
    
}
