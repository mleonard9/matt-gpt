import React from 'react';
import {
  IconRobot,
  IconUser,
  IconCopy,
  IconCheck,
} from '@tabler/icons-react';

// import rehypeMathjax from 'rehype-mathjax';
// import remarkGfm from 'remark-gfm';
// import remarkMath from 'remark-math';

import { CodeBlock } from './CodeBlock';
import MemoizedReactMarkdown from './MemoizedReactMarkdown';

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
                <div className="flex flex-row">
                <MemoizedReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      if (children.length) {
                        if (children[0] == '▍') {
                          return <span className="animate-pulse cursor-default mt-1">▍</span>
                        }
  
                        children[0] = (children[0]).replace("`▍`", "▍")
                      }
  
                      const match = /language-(\w+)/.exec(className || '');
  
                      return !inline ? (
                        <CodeBlock
                          key={Math.random()}
                          language={(match && match[1]) || ''}
                          value={String(children).replace(/\n$/, '')}
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    table({ children }) {
                      return (
                        <table className="border-collapse border border-black px-3 py-1 dark:border-white">
                          {children}
                        </table>
                      );
                    },
                    th({ children }) {
                      return (
                        <th className="break-words border border-black bg-gray-500 px-3 py-1 text-white dark:border-white">
                          {children}
                        </th>
                      );
                    },
                    td({ children }) {
                      return (
                        <td className="break-words border border-black px-3 py-1 dark:border-white">
                          {children}
                        </td>
                      );
                    },
                  }}
                >
                  {`${message.content}`}
                </MemoizedReactMarkdown>
              </div>
              ) : (
                <div className="flex flex-row">
                  {message.content}
                </div>
              )
              }
          </div>
      </div>
    </div>
)};

export default ChatMessage;