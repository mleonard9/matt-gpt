import './App.css';
import './normal.css';
import { useState, useEffect  } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Chat from './components/Chat/Chat';
import UserInput from './components/Chat/UserInput';
import SideMenu from './components/SideMenu';

function App() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    if(chats.length === 0) {
      addChat();
    }
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

    const newUserMessage = { role: "user", content: message };
    // Adds user message to active chat
    const updatedUserChat = { ...activeChat, messages: [...activeChat.messages, newUserMessage] };
    // Updates all chats with updated active chat
    const updatedUserChats = chats.map(chat => chat.id === activeChatId ? updatedUserChat : chat);
    setChats(updatedUserChats);

    try { 
    const response = await fetch('http://localhost:3080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: updatedUserChat.messages,
      }),
    });

    const data = await response.json();

    const newAssistantMessage = { role: "assistant", content: data.message.content };
    // Adds assistant message to active chat
    const updatedAssistantChat = { ...updatedUserChat, messages: [...updatedUserChat.messages, newAssistantMessage] };
    // Updates all chats with updated active chat
    const updatedAssistantChats = chats.map(chat => chat.id === activeChatId ? updatedAssistantChat : chat);
    setChats(updatedAssistantChats);

    } catch (e) {
      console.log(e);
    }
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
        <UserInput onSubmit={handleSubmit}/>
      </section>
    </div>
  );
}

export default App;
