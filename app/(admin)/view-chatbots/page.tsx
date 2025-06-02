import { auth } from '@clerk/nextjs/server';
import React from 'react';
import { serverClient } from '../../../graphql/serverClient';
import { GET_CHATBOTS_BY_USER  } from '../../../graphql/queries/queries';
import { Chatbot } from '../../../types/types';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import Avatar from '../../../components/Avatar';

async function ViewChatbots() {
  const { userId } = await auth();
  if (!userId) return <div>Please log in to view chatbots</div>;

  try {
    console.log("Fetching all chatbots...");
    const response = await serverClient.query({
      query: GET_CHATBOTS_BY_USER ,
    });

    const allChatbots: Chatbot[] = response.data?.chatbotsList ?? [];
    const chatbotsByUser = allChatbots.filter(
      (chatbot) => chatbot.clerk_user_id === userId
    );

    const sortedChatbotsByUser = chatbotsByUser.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return (
      <div className='flex-1 pb-20 p-4 sm:p-6 lg:p-10'>
        <h1 className='text-xl lg:text-3xl font-semibold mb-6'>Active Chatbots</h1>
        
        {sortedChatbotsByUser.length === 0 ? (
          <div className='space-y-4'>
            <p>You have not created any chatbots yet, Click on the button below to Create one.</p>
            <Link href="/create-chatbot">
              <Button className='text-white bg-[#64B5F5] p-3 rounded-md'>Create Chatbot</Button>
            </Link>
          </div>
        ) : (
          <ul className='space-y-4'>
            {sortedChatbotsByUser.map((chatbot) => (
              <Link key={chatbot.id} href={`/edit-chatbot/${chatbot.id}`}>
                <li className='relative p-4 sm:p-6 lg:p-8 bg-gray-100 rounded-md shadow-md w-full max-w-4xl hover:shadow-lg transition-shadow'>
                  
                  {/* Header Section */}
                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4'>
                    <div className='flex items-center space-x-3 sm:space-x-4'>
                      <div className='w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0'>
                        <Avatar seed={chatbot.name} className='w-full h-full' />
                      </div>
                      <h2 className='text-lg sm:text-xl font-bold break-words'>{chatbot.name}</h2>
                    </div>
                    <p className='text-xs text-gray-400 flex-shrink-0'>
                      Created: {new Date(chatbot.created_at).toLocaleString()}
                    </p>
                  </div>

                  <hr className='border-gray-400 mb-4'/>

                  {/* Content Section - Mobile First Design */}
                  <div className='space-y-4 sm:space-y-6'>
                    
                    {/* Characteristics Section */}
                    <div className='space-y-2'>
                      <h3 className='font-semibold text-gray-700'>Characteristics:</h3>
                      <div className='pl-2 sm:pl-4'>
                        {!chatbot.chatbot_characteristics.length ? (
                          <p className='text-sm text-gray-500 italic'>No characteristics added yet</p>
                        ) : (
                          <ul className='text-sm space-y-1'>
                            {chatbot.chatbot_characteristics.map((characteristic) => (
                              <li key={characteristic.id} className='list-disc list-inside break-words text-gray-600'>
                                {characteristic.content}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Sessions Section */}
                    <div className='space-y-2'>
                      <h3 className='font-semibold text-gray-700'>Number of sessions:</h3>
                      <div className='pl-2 sm:pl-4'>
                        <p className='text-sm text-gray-600'>{chatbot.chat_sessions.length}</p>
                      </div>
                    </div>

                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching chatbots:", error);
    return (
      <div className='flex-1 pb-20 p-4 sm:p-6 lg:p-10'>
        <h1 className='text-xl lg:text-3xl font-semibold mb-4'>Error loading chatbots</h1>
        <div className='space-y-2'>
          <p>Server Error fetching chatbots: {error instanceof Error ? error.message : String(error)}</p>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }
}

export default ViewChatbots;