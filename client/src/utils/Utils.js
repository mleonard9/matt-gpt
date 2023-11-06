const JarvisQuotes = [
  "J.A.R.V.I.S., are you up?",
  "I'd like to open a new project file, index as: Mark II.",
  "J.A.R.V.I.S., you there?",
  "Working on a secret project, are we, sir?",
];

export const getJarvisQuote = () => {
  return JarvisQuotes[Math.floor(Math.random() * JarvisQuotes.length)];
};

export const callOpenAiChatApi = async (messages) => {
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: messages,
    }),
  });
  const data = await response.json();
  return data;
}