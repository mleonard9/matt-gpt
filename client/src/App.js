import './App.css';
import './normal.css';
import { useState } from 'react';
import {
  IconRobot,
  IconUser,
} from '@tabler/icons-react';

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  function clearChat(){
    setChatLog([]);
  }

  async function handleSubmit(e){
    e.preventDefault();

    let chatLogNew = [...chatLog, { role: "user", content: `${input}`}];
    setChatLog(chatLogNew);
    setInput("");

    try {
      console.log("fetching...")
      const response = await fetch('http://localhost:3080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatLog: chatLogNew,
      }),
    });
    const data = await response.json();
    setChatLog([...chatLogNew, { role: "assistant", content: `${data.message.content}`}]);
    } catch (e) {
      console.log(e);
    }
  } 

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input 
              rows="1"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="chat-input-textarea"
              ></input>
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.role === "assistant" && "chatgpt"}`}>
        <div className="chat-message-center">
          <div className="avatar">
          {message.role === 'assistant' ? (
            <IconRobot size={30} />
          ) : (
            <IconUser size={30} />
          )}
          </div>
          <div className="message">
              {message.content}
          </div>
      </div>
    </div>
)};

export default App;
