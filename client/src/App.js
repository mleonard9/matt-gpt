import './App.css';
import './normal.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Chat from './components/Chat/Chat';

function App() {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  function addChat() {
    const newChat = {
      id: uuidv4(), 
      messages: []
    };
    setChats([...chats, newChat]);
    setActiveChatId(newChat.id);
  }

  async function handleSubmit(e){
    e.preventDefault();

    const activeChat = chats.find(chat => chat.id === activeChatId);
    const newUserMessage = { role: "user", content: input };
    const updatedUserChat = { ...activeChat, messages: [...activeChat.messages, newUserMessage] };
    const updatedUserChats = chats.map(chat => chat.id === activeChatId ? updatedUserChat : chat);

    setChats(updatedUserChats);
    setInput("");

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

    const newUserMessage = { role: "assistant", content: data.message.content };
    const updatedAssistantChat = { ...updatedUserChat, messages: [...updatedUserChat.messages, newUserMessage] };
    const updatedAssistantChats = chats.map(chat => chat.id === activeChatId ? updatedAssistantChat : chat);
    setChats(updatedAssistantChats);

    } catch (e) {
      console.log(e);
    }
  } 

  const deleteChat = (id) => {
    const updatedChats = chats.filter(chat => chat.id !== id);
    setChats(updatedChats);

    if (activeChatId === id) {
      setActiveChatId(null);
    }
  };

  function handleChatSelect(id) {
    setActiveChatId(id);
  };

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={addChat}>
          <span>+</span>
          New Chat
        </div>
        {
          chats.map(chat => (
            <div className="side-menu-chat" key={chat.id} onClick={() => {handleChatSelect(chat.id)} }>
              <span>Chat</span>
            </div>
          ))
        }
      </aside>
      <section className="chatbox">
        {
          activeChatId && (
            <Chat chat={chats.find(chat => chat.id === activeChatId)} />
          )
        }
      </section>
      <section className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input 
              rows="1"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="chat-input-textarea"
              ></input>
          </form>
      </section>
    </div>
  );
}

export default App;
