import axios from "axios";

export async function POST(req:any) {
  const { language_id, source_code } = await req.json();

  try {
    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        language_id,
        source_code,
      },
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error:any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
