const local_url = 'http://localhost:3080';
const render_url = 'https://matt-gpt-express.onrender.com'

export async function callOpenAiChatApi(messages, model, prompt) {
  try {
    const response = await fetch(`${local_url}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages,
        model: model,
        prompt: prompt,
      }),
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('API request error:', error.message);
    throw error;
  }
}

export async function callOpenAiImageApi(prompt) {
  try {
    const response = await fetch(`${local_url}/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imagePrompt: prompt,
      }),
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('API request error:', error.message);
    throw error;
  }
}

export async function callOpenAiModelsApi() {
  try {
    const response = await fetch(`${local_url}/models`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
   
    const data = await response.json(); 

    return data.models;
  } catch (error) {
    console.error('API request error:', error.message);
    throw error;
  }
}
