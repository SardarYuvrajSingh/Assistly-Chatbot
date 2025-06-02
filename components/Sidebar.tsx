import { BotMessageSquare, PenLine, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Sidebar() {
  return (
    <div className='bg-gradient-to-b from-[#1E3A8A] to-[#3B82F6] text-white p-6 shadow-xl rounded-xl min-h-screen'>
      <ul className='flex flex-col gap-6'>
        {/* Create Chatbot */}
        <li className='relative group'>
          <Link
            href='/create-chatbot'
            className='flex items-center gap-4 p-4 rounded-xl bg-[#F3F4F6] text-[#1E3A8A] hover:bg-[#E5E7EB] transition-all duration-300'
          >
            <BotMessageSquare className='h-6 w-6 lg:h-8 lg:w-8 text-[#1E3A8A] group-hover:scale-110 transition-transform duration-300' />
            <div className='hidden lg:block'>
              <p className='text-lg font-semibold'>Create</p>
              <p className='text-sm text-[#4B5563]'>New Chatbot</p>
            </div>
          </Link>
          
          {/* Tooltip for mobile/tablet when text is hidden */}
          <div className='absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 lg:hidden'>
            Create Chatbot
            <div className='absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900'></div>
          </div>
        </li>

        {/* Edit Chatbots */}
        <li className='relative group'>
          <Link
            href='/view-chatbots'
            className='flex items-center gap-4 p-4 rounded-xl bg-[#F3F4F6] text-[#1E3A8A] hover:bg-[#E5E7EB] transition-all duration-300'
          >
            <PenLine className='h-6 w-6 lg:h-8 lg:w-8 text-[#1E3A8A] group-hover:scale-110 transition-transform duration-300' />
            <div className='hidden lg:block'>
              <p className='text-lg font-semibold'>Edit</p>
              <p className='text-sm text-[#4B5563]'>Chatbots</p>
            </div>
          </Link>
          
          {/* Tooltip for mobile/tablet when text is hidden */}
          <div className='absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 lg:hidden'>
            Edit Chatbots
            <div className='absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900'></div>
          </div>
        </li>

        {/* Review Sessions */}
        <li className='relative group'>
          <Link
            href='/review-sessions'
            className='flex items-center gap-4 p-4 rounded-xl bg-[#F3F4F6] text-[#1E3A8A] hover:bg-[#E5E7EB] transition-all duration-300'
          >
            <SearchIcon className='h-6 w-6 lg:h-8 lg:w-8 text-[#1E3A8A] group-hover:scale-110 transition-transform duration-300' />
            <div className='hidden lg:block'>
              <p className='text-lg font-semibold'>View</p>
              <p className='text-sm text-[#4B5563]'>Sessions</p>
            </div>
          </Link>
          
          {/* Tooltip for mobile/tablet when text is hidden */}
          <div className='absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 lg:hidden'>
            View Sessions
            <div className='absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900'></div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar