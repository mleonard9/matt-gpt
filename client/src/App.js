import './App.css';
import './normal.css';
import { useState, useEffect  } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Chat from './components/Chat/Chat';
import UserInput from './components/Chat/UserInput';
import SideMenu from './components/SideMenu';
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
      id: uuidv4(), 
      messages: []
    };
    setChats([...chats, newChat]);
    setActiveChatId(newChat.id);
  }

  const deleteChat = (id) => {
    if(chats.length === 1) {
      setActiveChatId(null);
      setChats([]);
      return;
    } else {
      const updatedChats = chats.filter(chat => chat.id !== id);

      if (activeChatId === id) {
        setActiveChatId(updatedChats[0].id);
      }

      setChats(updatedChats);
    }
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
      const data = await callOpenAiChatApi(updatedUserChat.messages);
      assistantMessage = { role: "assistant", content: data.message.content };
    }

    const updatedAssistantChat = { ...updatedUserChat, messages: [...updatedUserChat.messages, assistantMessage] };  
    const updatedAssistantChats = chats.map(chat => chat.id === activeChatId ? updatedAssistantChat : chat);
    setChats(updatedAssistantChats);
  };

  function selectChat(id) {
    setActiveChatId(id);
  };

  return (
    <div className="App">
      <aside className="sidemenu">
        <SideMenu chats={chats} activeChatId={activeChatId} onSelect={selectChat} onDelete={deleteChat} onAddChat={addChat} onTitleChange={changeTitle} />
      </aside>
      <section className="chatbox">
        <Chat chat={chats.find(chat => chat.id === activeChatId)} />
      </section>
      <section className="chat-input-holder">
        <UserInput onSubmit={handleSubmit} jarvisQuote={jarvisQuote}/>
      </section>
    </div>
  );
}

export default App;
