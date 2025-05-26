'use client'
import React from 'react'
import { ChatbotCharacteristic, GetChatbotByIdResponse, GetChatbotByIdVariables } from '../types/types'
import { OctagonX } from 'lucide-react'
import { useMutation, useQuery } from '@apollo/client'
import { REMOVE_CHARACTERISTIC } from '../graphql/mutations/mutation'
import { toast } from 'sonner'

function Characteristic({characteristic}: {characteristic: ChatbotCharacteristic}) {
    const [removeCharacteristic] = useMutation(REMOVE_CHARACTERISTIC,{
        refetchQueries: ['getChatbotById'],
        awaitRefetchQueries: true,
    })

    const handleRemoveCharacteristic = async (characteristicId:number) => {
        try{
            await removeCharacteristic({
                variables: {
                    characteristicId,
                },
            });
            window.location.reload();
        }
        catch (error) {
            console.error("Error removing characteristic:", error);
        }
    }



  return (
    <li key={characteristic.id} className='relative p-10 pr-8 bg-gray-100 rounded-md shadow-md max-w-sm'>
        {characteristic.content}
        <OctagonX 
            className='w-6 h-6 text-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50' 
            onClick={() => {
                const promise = handleRemoveCharacteristic(characteristic.id);
                toast.promise(promise, {
                    loading: "Removing characteristic...",
                    success: "Characteristic removed",
                    error: "Error removing characteristic",
                });
            }}
        />
    </li>
  )
}

export default Characteristic
