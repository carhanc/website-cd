// src/pages/api/chat.js
import axios from 'axios';

export default async function handler(req, res) {
  console.log('Received request:', req.body);

  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 150,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('OpenAI response:', response.data);
      res.status(200).json({ response: response.data.choices[0].message.content });
    } catch (error) {
      console.error('Error communicating with OpenAI:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Error communicating with OpenAI', details: error.response ? error.response.data : error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
