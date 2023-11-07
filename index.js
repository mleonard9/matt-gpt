require('dotenv').config()

const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const configuration = new Configuration({ 
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3080;

app.post('/', async (req, res) => {
  const { messages } = req.body;

  const messagesWithPrompt = [{ 
    role: 'user', content: 'You are MattGPT, a large language model trained by OpenAI. Follow the user`s instructions carefully. Respond using markdown.' }, 
    ...messages,
  ];
  
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messagesWithPrompt,
      max_tokens: 512,
    });
  
    res.json({
      message: response.data.choices[0].message,
    })
  } catch (e) {
    console.log(e);
  }
});

app.post('/images', async (req, res) => {
  const { imagePrompt } = req.body;

  try {
    const response = await openai.createImage({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
    });
  
    res.json({
      image_url: response.data.data[0].url,
    })
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`MattGPT listening at http://localhost:${port}`)
});
