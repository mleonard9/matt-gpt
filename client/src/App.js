import './App.css';
import './normal.css';
import { useState, useEffect  } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Chat from './components/Chat/Chat';
import LeftPanel from './components/Panels/LeftPanel';
import RightPanel from './components/Panels/RightPanel';
import { getJarvisQuote } from './utils/Utils';
import { callOpenAiChatApi, callOpenAiImageApi } from './api/OpenAI';

function App() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [jarvisQuote, setJarvisQuote] = useState('');

  useEffect(() => {
    if(chats.length === 0) {
      addChat();
    }
    setJarvisQuote(getJarvisQuote());
  }, []);

  function addChat() {
    const newChat = {
      title: "New Chat",
      model: "gpt-3.5-turbo",
      prompt: "You are MattGPT, a large language model trained by OpenAI. Follow the user`s instructions carefully. Respond using markdown.",
      id: uuidv4(), 
      messages: []
    };
    setChats([...chats, newChat]);
    setActiveChatId(newChat.id);
  }

  const deleteChat = (id) => {
    const updatedChats = chats.filter(chat => chat.id !== id);

    if (activeChatId === id && updatedChats.length > 0) {
      setActiveChatId(updatedChats[0].id);
    }

    setChats(updatedChats);
  };

  const changeTitle = (id, title) => {
    const updatedChats = chats.map(chat => chat.id === id ? {...chat, title: title} : chat);
    setChats(updatedChats);
  };

  const getActiveChat = () => {
    return chats.find(chat => chat.id === activeChatId);
  };

  async function handleSubmit(message) {
    if (message.length === 0) return;

    const activeChat = getActiveChat();

    const updatedUserChat = { ...activeChat, messages: [...activeChat.messages, { role: "user", content: message }] };
    const updatedUserChats = chats.map(chat => chat.id === activeChatId ? updatedUserChat : chat);
    setChats(updatedUserChats);

    let assistantMessage = {};
    if(message.startsWith('!image')) {
      const imageData = await callOpenAiImageApi(message.split('!image')[1]);
      const markdownImage = `![](${imageData.image_url})`;
      assistantMessage = { role: "assistant", content: markdownImage };
    } else {
      const data = await callOpenAiChatApi(updatedUserChat.messages, updatedUserChat.model, updatedUserChat.prompt);
      assistantMessage = { role: "assistant", content: data.message.content };
    }

    const updatedAssistantChat = { ...updatedUserChat, messages: [...updatedUserChat.messages, assistantMessage] };  
    const updatedAssistantChats = chats.map(chat => chat.id === activeChatId ? updatedAssistantChat : chat);
    setChats(updatedAssistantChats);
  };


  const selectChat = (id) => {
    setActiveChatId(id);
  };

  const handleAddChatWithProfile = (profile) => {
    const newChat = {
      title: profile.title,
      model: profile.model,
      prompt: profile.prompt,
      id: uuidv4(), 
      messages: []
    };
    setChats([...chats, newChat]);
    setActiveChatId(newChat.id);
  };

  return (
    <div className="App">
      <LeftPanel chats={chats} activeChatId={activeChatId} onSelect={selectChat} onDelete={deleteChat} onAddChat={addChat} onTitleChange={changeTitle} />
      <Chat chat={chats.find(chat => chat.id === activeChatId)} onSubmit={handleSubmit} jarvisQuote={jarvisQuote} />
      <RightPanel onAddChatWithProfile={handleAddChatWithProfile}/>
    </div>
  );
}

export default App;
