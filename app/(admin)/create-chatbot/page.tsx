"use client";

import { useMutation } from "@apollo/client";
import Avatar from "../../../components/Avatar";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { CREATE_CHATBOT } from "../../../graphql/mutations/mutation";
import { useUser } from "@clerk/nextjs";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function CreateChatbot() {
  const { user } = useUser();
  const [name, setName] = useState("");
  const router = useRouter();

  const [createChatbot, { loading }] = useMutation(CREATE_CHATBOT);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting...");

    if (!user?.id || !name) return;

    const createdAt = new Date().toISOString();

    try {
      const response = await createChatbot({
        variables: {
          clerk_user_id: user.id,
          name,
          created_at: createdAt,
        },
      });

      const chatbotId = response.data?.insertChatbots?.id;

      if (chatbotId) {
        setName("");
        router.push(`/edit-chatbot/${chatbotId}`);
      } else {
        console.error("No chatbot ID returned");
      }
    } catch (err) {
      console.error("Create chatbot error:", err);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen w-full">
    <div className="flex flex-col items-center justify-center md:flex-row md:space-x-10 bg-white p-10 rounded:md m-10">
      <Avatar seed="create-chatbot" />
      <div>
        <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
        <h2 className="font-light">
          Create a new chatbot to assist you in your conversations with your customers.
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 mt-5">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Chatbot Name..."
            className="max-w-lg"
            required
          />
          <Button
            type="submit"
            disabled={loading || !name}
            className="bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          >
            {loading ? "Creating Chatbot..." : "Create Chatbot"}
          </Button>
        </form>
        <p className="text-gray-400 mt-5">Example: Customer Support Chatbot</p>
      </div>
    </div>
  </div>
  
  );
}

export default CreateChatbot;
