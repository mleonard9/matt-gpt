require('dotenv').config()

const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const configuration = new Configuration({ 
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3080;

app.post('/', async (req, res) => {
  const { messages } = req.body;
  console.log('Messages' + JSON.stringify(messages));
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 1000,
    });
  
    res.json({
      message: response.data.choices[0].message,
    })
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
