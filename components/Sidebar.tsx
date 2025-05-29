import { BotMessageSquare, PenLine, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Sidebar() {
  return (
    <div className='bg-gradient-to-b from-[#1E3A8A] to-[#3B82F6] text-white p-6 shadow-xl rounded-xl min-h-screen'>
      <ul className='flex flex-col gap-6'>
        {/* Create Chatbot */}
        <li>
          <Link
            href='/create-chatbot'
            className='flex items-center gap-4 p-4 rounded-xl bg-[#F3F4F6] text-[#1E3A8A] hover:bg-[#E5E7EB] transition-all duration-300 group'
          >
            <BotMessageSquare className='h-6 w-6 lg:h-8 lg:w-8 text-[#1E3A8A] group-hover:scale-110 transition-transform duration-300' />
            <div className='hidden lg:block'>
              <p className='text-lg font-semibold'>Create</p>
              <p className='text-sm text-[#4B5563]'>New Chatbot</p>
            </div>
          </Link>
        </li>

        {/* Edit Chatbots */}
        <li>
          <Link
            href='/view-chatbots'
            className='flex items-center gap-4 p-4 rounded-xl bg-[#F3F4F6] text-[#1E3A8A] hover:bg-[#E5E7EB] transition-all duration-300 group'
          >
            <PenLine className='h-6 w-6 lg:h-8 lg:w-8 text-[#1E3A8A] group-hover:scale-110 transition-transform duration-300' />
            <div className='hidden lg:block'>
              <p className='text-lg font-semibold'>Edit</p>
              <p className='text-sm text-[#4B5563]'>Chatbots</p>
            </div>
          </Link>
        </li>

        {/* Review Sessions */}
        <li>
          <Link
            href='/review-sessions'
            className='flex items-center gap-4 p-4 rounded-xl bg-[#F3F4F6] text-[#1E3A8A] hover:bg-[#E5E7EB] transition-all duration-300 group'
          >
            <SearchIcon className='h-6 w-6 lg:h-8 lg:w-8 text-[#1E3A8A] group-hover:scale-110 transition-transform duration-300' />
            <div className='hidden lg:block'>
              <p className='text-lg font-semibold'>View</p>
              <p className='text-sm text-[#4B5563]'>Sessions</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
