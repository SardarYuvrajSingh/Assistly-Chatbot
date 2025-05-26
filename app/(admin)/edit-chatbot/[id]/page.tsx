'use client'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { Input } from '../../../../components/ui/input'
import { BASE_URL } from '../../../../graphql/apolloClient'
import { Copy } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { toast } from 'sonner'
import Avatar from '../../../../components/Avatar'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CHATBOT_BY_ID } from '../../../../graphql/queries/queries'
import { GetChatbotByIdResponse, GetChatbotByIdVariables } from '../../../../types/types'
import Characteristic from '../../../../components/Characteristic'
import { ADD_CHARACTERISTIC, DELETE_CHATBOT, UPDATE_CHATBOT } from '../../../../graphql/mutations/mutation'
import { redirect, useRouter } from 'next/navigation'

function EditChatbot({ params }: { params: Promise<{ id: string }> }){
  const { id } = use(params);
  const [url, setUrl] = useState<string>("")
  const [chatbotName, setChatbotName] = useState<string>("")
  const [newCharacteristic, setNewCharacteristic] = useState<string>("")
  const router = useRouter();
  const [deleteChatbot]=useMutation(DELETE_CHATBOT, {
    refetchQueries: ['getChatbotById'],
    awaitRefetchQueries: true,
  })
  
  const [updateChatbot]=useMutation(UPDATE_CHATBOT, {
    refetchQueries: ['getChatbotById'],
    awaitRefetchQueries: true,
  })

  const [addCharacteristic]=useMutation(ADD_CHARACTERISTIC, {
    refetchQueries: ['getChatbotById'],
    awaitRefetchQueries: true,
  })
  useEffect(() => {
    const url = `${BASE_URL}/chatbot/${id}`
    setUrl(url);
  },[id])

  const{data,loading,error, refetch}=useQuery<GetChatbotByIdResponse,GetChatbotByIdVariables>(GET_CHATBOT_BY_ID, {variables:{id}})

  useEffect(() => {
    if (data) {
      setChatbotName(data.chatbots.name)
    }
  }, [data])

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this chatbot?"
    );
    if (!isConfirmed) return;
  
    try {
      await deleteChatbot({ variables: { id } });
      toast.success("Chatbot Successfully deleted!");
      router.push("/view-chatbots");
    } catch (error) {
      console.error("Error deleting chatbot:", error);
      toast.error("Failed to delete chatbot");
    }
  };

  const handleAddCharacteristic = async (content: string) => {
    try {
      const promise = addCharacteristic({
        variables: {
          chatbotId: Number(id),
          content,
          createdAt: new Date().toISOString(),
        },
        onCompleted: () => {
          refetch();
        }
      });
      
      toast.promise(promise, {
        loading: "Adding characteristic...",
        success: "Characteristic added!",
        error: "Failed to add characteristic",
      });
    } catch (error) {
      console.error("Error adding characteristic:", error);
    }
  };

  const handleUpdateChatbot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const promise = updateChatbot({
        variables: {
          id,
          name: chatbotName,
          createdAt: new Date().toISOString(), 
        },
        onCompleted: () => {
          refetch();
        }
      })
      toast.promise(promise, {
        loading: "Updating chatbot...",
        success: "Chatbot Name Successfully updated!",
        error: "Failed to update chatbot",
      });
    } catch (error) {
      console.error("Error updating chatbot:", error);
    }
  }

  if(loading)
    return(
  <div className='mx-auto animate-spin p-10'>
    <Avatar seed="loading" />
  </div>
  )

  if(!data?.chatbots) return redirect("view-chatbots")

  return (
    <div className='px-0 md:p-10'>
      <div className='md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-[#2991EE]'>
        <h2 className="text-white text-sm font-bold">Link to Chat</h2>
        <p className="text-sm italic text-white">
          Share this link with your customers to start a conversation with your chatbot.
        </p>
        <div className='flex items-center space-x-2'>
          <Link href={url} className='w-full cursor-pointer hover:capacity-50'>
            <Input value= {url} readOnly className="cursor-pointer bg-white" />
          </Link>
          <Button
            size="sm"
            className="px-3"
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success("Copied to clipboard");
            }}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <section className='relative mt-5 bg-white p-5 md:p-10 rounded-lg'>
        <Button className='absolute top-2 right-2 h-8 w-2' variant="destructive" onClick={() => handleDelete(id)}>
            x
        </Button>
        <div className='flex space-x-4'>
          <Avatar seed={chatbotName}/>
          <form 
          onSubmit={handleUpdateChatbot}
          className='flex flex-1 space-x-2 items-center'>
            <Input
            value={chatbotName}
            onChange={(e)=> setChatbotName(e.target.value)}
            placeholder={chatbotName}
            className='w-full border-none bg-transparent text-xl font-bold'
            required
            />
            <Button type='submit' disabled={!chatbotName}>
              Update
            </Button>
          </form>
        </div>
        <h2 className='text-xl font-bold mt-10'>Here is what your AI knows...</h2>
        <p>
          Your chatbot is trained on the following information to assist you in conversations. You can update this information to change how your chatbot responds to your customers.
        </p>
        <div className='bg-gray-200 p-5 md:p-5 rounded-md mt-5'>
          <form onSubmit={e=>{
            console.log("submitted")
            e.preventDefault();
            handleAddCharacteristic(newCharacteristic);
            setNewCharacteristic("");
          }}
          className='flex space-x-2 mb-5'>
            <Input
              type="text"
              placeholder="Example: If customer asks for prices, provide pricing page: www.example.com/pricing"
              value={newCharacteristic}
              onChange={(e) => setNewCharacteristic(e.target.value)}
            />
            <Button type="submit" disabled={!newCharacteristic}>
              Add
            </Button>
          </form>
          <ul className='flex flex-wrap-reverse gap-5'>
            {data?.chatbots?.chatbot_characteristics?.map((characteristic) => (
              // <li key={characteristic.id} className='relative mt-2 p-2 bg-gray-100 rounded-md'>
              //   {characteristic.content}
              //   <Button variant="destructive" className='absolute top-1 right-1 h-6 w-6' onClick={() => {/* handle delete */}}>
              //     x
              //   </Button>
              // </li>
              <Characteristic 
                key={characteristic.id} 
                characteristic={characteristic}
                
              />
            ))}
          </ul>
        </div>

      </section>
    </div>
  )
}

export default EditChatbot
