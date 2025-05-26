"use client";
import { useEffect, useState } from 'react';
import { Chatbot } from '../types/types'
import { Accordion, AccordionItem } from './ui/accordion';
import { AccordionContent, AccordionTrigger } from '@radix-ui/react-accordion';
import Avatar from './Avatar';
import Link from 'next/link';
import ReactTimeage from "react-timeago";
import { ChevronDown } from 'lucide-react';

function ChatBotSessions({chatbots}:{chatbots: Chatbot[]}) {
    const [sortedChatbots, setSortedChatbots] = useState<Chatbot[]>(chatbots);
    
    useEffect(() => {
        const sortedArray =[...chatbots].sort(
            (a, b) => b.chat_sessions.length - a.chat_sessions.length
        );
        setSortedChatbots(sortedArray);
    }, [chatbots]);
    
    return (
        <div className="space-y-2 bg-white">
            <Accordion type='single' collapsible className="space-y-2">
                {sortedChatbots.map((chatbot) => {
                    const hasSessions = chatbot.chat_sessions.length > 0;
                    
                    return (
                        <AccordionItem 
                            key={chatbot.id} 
                            value={`item-${chatbot.id}`} 
                            className="border border-gray-200 rounded-md overflow-hidden shadow-sm"
                        >
                            {hasSessions ? (
                                <>
                                    <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 w-full">
                                        <div className='flex text-left items-center w-full'>
                                            <Avatar seed={chatbot.name} className='h-8 w-8 mr-4'/>
                                            <div className='flex flex-1 justify-between items-center'>
                                                <p className="font-medium">{chatbot.name}</p>
                                                <div className="flex items-center">
                                                    <p className='pr-2 font-bold text-right'>
                                                        {chatbot.chat_sessions.length} sessions
                                                    </p>
                                                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='space-y-2 p-4 bg-gray-50'>
                                        {chatbot.chat_sessions.map((session) => (
                                            <Link 
                                                href={`/review-sessions/${session.id}`} 
                                                key={session.id} 
                                                className='relative p-4 bg-[#2991EE] text-white rounded-md block'
                                            >
                                                <p className='text-lg font-bold'>{session.guests?.name || "Anonymous"}</p>
                                                <p className='text-sm font-light'>{session.guests?.email || "No email provided"}</p>
                                                <p className='absolute top-4 right-4 text-sm'>
                                                    <ReactTimeage date={new Date(session.created_at)} />
                                                </p>
                                            </Link>
                                        ))}
                                    </AccordionContent>
                                </>
                            ) : (
                                <div className="px-4 py-3">
                                    <p className="font-light">{chatbot.name} (No Sessions)</p>
                                </div>
                            )}
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    )
}

export default ChatBotSessions