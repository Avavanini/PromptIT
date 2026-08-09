import { BotIcon, BotMessageSquareIcon, UserIcon } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import PromptInput from './PromptInput'

const renderLogLine = (line, i) => {
    // Split the string using a regex that captures backticked paths OR plain paths starting with /
    const parts = line.split(/(`[^`]+`|\/[\w./-]+)/g);

    return (
        <span key={i} className="block mt-2 first:mt-0">
            {parts.map((part, j) => {
                if (part.startsWith('`') && part.endsWith('`')) {
                    const path = part.slice(1, -1);
                    return <span key={j} className="font-mono text-[#F9B17A] bg-[#1C2135] px-1.5 py-0.5 rounded mx-0.5">{path}</span>;
                } else if (part.startsWith('/')) {
                    return <span key={j} className="font-mono text-[#F9B17A] bg-[#1C2135] px-1.5 py-0.5 rounded mx-0.5">{part}</span>;
                }
                return <span key={j}>{part}</span>;
            })}
        </span>
    );
}

const renderMessageContent = (content) => {
    if (!content) return null;
    const lines = content.split('\n');

    return (
        <div className="text-sm text-[#FFFFFF] tracking-wider whitespace-pre-wrap break-words leading-[1.5]">
            {lines.map((line, i) => renderLogLine(line, i))}
        </div>
    );
}

const ChatPanel = ({messages, onSend, loading}) => {

    const bottomRef = useRef(null)

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: "auto"})
    },[messages, loading])

  return (
    <div className="flex flex-col h-full bg-[#0B0D17]">
         {/* Messages */}
         <div className="flex-1 overflow-y-auto p-3 space-y-3 hide-scrollbar">
            {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                   <p className="text-[#7582B8] text-sm text-center">Ask AI to modify your website</p> 
                </div>
            )}

            {messages.map((msg, i)=>(
                <div key={i}>
                    <div className="flex gap-2.5 items-start">
                        <div className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-0.5 bg-[#1C2135]">
                            {msg.role === "user" ? (
                                <UserIcon size={14} className='text-[#FF9E5E]'/>
                            ) : (
                                <BotMessageSquareIcon size={14} className="text-[#FFFFFF]"/>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                             <p className="text-xs font-bold text-[#7582B8] mb-1 uppercase tracking-wider">
                                {msg.role === "user" ? "You" : "AI"}
                            </p>
                            {renderMessageContent(msg.content)}
                        </div>
                    </div>
                </div>
            ))}

            {loading && (
                <div className="flex gap-2.5 items-start">
                    <div className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-0.5 bg-[#1C2135]">
                        <BotIcon size={13} className='text-[#FF9E5E]'/>
                    </div>
                    <div className='flex-1'>
                        <p className="text-[11px] font-bold text-[#7582B8] mb-2 uppercase tracking-wider">AI</p>
                        <div className='dot-loader'>
                            <span style={{backgroundColor: '#FF9E5E'}}></span>
                            <span style={{backgroundColor: '#FF9E5E'}}></span>
                            <span style={{backgroundColor: '#FF9E5E'}}></span>
                        </div>
                    </div>
                </div>
            )}
            <div ref={bottomRef}/>
         </div>

         {/* Input */}
         <div className="p-3 border-t border-[#7582B8]">
            <PromptInput onSubmit={onSend} loading={loading} placeholder='Ask AI to modify...' autoFocus/>
         </div>
    </div>
  )
}

export default ChatPanel