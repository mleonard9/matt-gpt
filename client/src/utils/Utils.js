const JarvisQuotes = [
  "J.A.R.V.I.S., are you up?",
  "I'd like to open a new project file, index as: Mark II.",
  "J.A.R.V.I.S., you there?",
  "Working on a secret project, are we, sir?",
  "Open the suit.",
  "Jarvis, ever hear the tale of Jonah?",
  "Jarvis, sometimes you gotta run before you can walk.",
];

export const getJarvisQuote = () => {
  return JarvisQuotes[Math.floor(Math.random() * JarvisQuotes.length)];
};
