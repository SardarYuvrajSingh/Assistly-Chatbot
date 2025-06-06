import { auth } from '@clerk/nextjs/server';
import React from 'react'
import { serverClient } from '../../../graphql/serverClient';
import { GET_CHATBOTS_BY_USER } from '../../../graphql/queries/queries';
import { Chatbot, GetUserChatbotsResponse, GetUserChatbotsVariables } from '../../../types/types';
import ChatBotSessions from '../../../components/ChatBotSessions';

async function ReviewSessions() {
    const { userId } = await auth();
    if (!userId) return <div>Please log in to view chatbots</div>;
    const {
        data: {chatbotsList},} = await serverClient.query<GetUserChatbotsResponse, GetUserChatbotsVariables>({
            query: GET_CHATBOTS_BY_USER,
            variables: { userId: userId },
        });
    const sortedChatbotsByUser: Chatbot[]= chatbotsList.map((chatbot) => ({
        ...chatbot,
        chat_sessions: [...chatbot.chat_sessions].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
    }));
  return (
    <div className='flex-1 px-10 min-h-screen w-full'>
      <h1 className='text-xl lg:text-3xl font-semibold mt-10'>Chat Sessions</h1>
      <h2 className='mb-5'>Review all the chat sessions the chat bots have had with your customers</h2>
      <ChatBotSessions chatbots={sortedChatbotsByUser} />
    </div>
  )
}

export default ReviewSessions
