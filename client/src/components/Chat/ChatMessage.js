import React from 'react';
import '../../App.css';
import {
  IconRobot,
  IconUser,
  IconCopy,
  IconCheck,
} from '@tabler/icons-react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function ChatMessage({ message }) {
  const [messageCopied, setMessageCopied] = React.useState(false);

  const copyOnClick = () => {
    if (!navigator.clipboard) return;
  
    navigator.clipboard.writeText(message.content).then(() => {
      setMessageCopied(true);
      setTimeout(() => {
        setMessageCopied(false);
      }, 2000);
    });
  };

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
              {message.role === 'assistant' ? (
                <div className="assistant-message">
                  <ReactMarkdown
                    children={message.content}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <SyntaxHighlighter
                            {...props}
                            children={String(children).replace(/\n$/, '')}
                            style={oneDark}
                            language={match[1]}
                            lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
                            wrapLines={true}
                          />
                      ) : (
                        <code {...props} className={className}>
                          {children}
                        </code>
                        )
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="user-message">
                  {message.content}
                </div>
              )
              }
          </div>
      </div>
    </div>
)};

export default ChatMessage;