// netlify/functions/chat.js
export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const body = JSON.parse(event.body || '{}');
  const userMessage = (body.message || '').toString().trim();
  if (!userMessage) {
    return { statusCode: 400, body: JSON.stringify({ error: 'No message provided' }) };
  }

  const API_KEY = process.env.GEMINI_API_KEY; // 👈 secure variable
  if (!API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing Gemini API Key' }) };
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    const payload = {
      contents: [{ parts: [{ text: userMessage }] }],
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't understand.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };

  } catch (error) {
    console.error('Gemini API error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'AI server error' }) };
  }
}
