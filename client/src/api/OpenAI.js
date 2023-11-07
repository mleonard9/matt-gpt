export async function callOpenAiChatApi(messages) {
  try {
    const response = await fetch('http://localhost:3080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages,
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
    const response = await fetch('http://localhost:3080/images', {
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
