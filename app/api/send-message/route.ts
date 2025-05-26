import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GetChatbotByIdResponse, MessagesByChatSessionIdResponse } from "../../../types/types";
import { serverClient } from "../../../graphql/serverClient";
import { GET_CHATBOT_BY_ID, GET_MESSAGES_BY_CHAT_SESSION_ID } from "../../../graphql/queries/queries";
import { INSERT_MESSAGE } from "../../../graphql/mutations/mutation";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { chat_session_id, chatbot_id, content, name } = await req.json();
    console.log(
      `Received message from chat session ${chat_session_id}: ${content} (chatbot: ${chatbot_id})`
    );

    // Step 1: Fetch chatbot characteristics
    const { data } = await serverClient.query<GetChatbotByIdResponse>({
      query: GET_CHATBOT_BY_ID,
      variables: { id: chatbot_id },
    });
    const chatbot = data.chatbots;
    if (!chatbot) {
      return NextResponse.json({ error: "Chatbot not found" }, { status: 404 });
    }

    // Step 2: Fetch previous messages
    const { data: messagesData } = await serverClient.query<MessagesByChatSessionIdResponse>({
      query: GET_MESSAGES_BY_CHAT_SESSION_ID,
      variables: { chat_session_id },
      fetchPolicy: "no-cache",
    });
    const previousMessages = messagesData.chat_sessions.messages;

    // Step 3: Format messages for Gemini
    const systemPrompt = chatbot.chatbot_characteristics
      .map((c) => c.content)
      .join(" + ");
    console.log(systemPrompt);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const conversationHistory = [];
    const systemMessage = `You are a helpful assistant talking to ${name}. If a generic question is asked which is not relevant or in the same scope or domain as the points mentioned in the key information section, kindly inform the user they're only allowed to search for the specified content. Use Emoji's where possible. Here is some key information that you need to be aware of, these are elements you may be asked about: ${systemPrompt}

Please acknowledge that you understand these instructions and are ready to help ${name}.`;

    conversationHistory.push({
      role: "user",
      parts: [{ text: systemMessage }]
    });

    conversationHistory.push({
      role: "model", 
      parts: [{ text: "I understand! I'm ready to help you with questions related to the specified content. Feel free to ask me anything within that scope! 😊" }]
    });

    // Add previous messages to conversation history
    previousMessages.forEach((message) => {
      if (message.sender === "user") {
        conversationHistory.push({
          role: "user",
          parts: [{ text: message.content }]
        });
      } else if (message.sender === "ai") {
        conversationHistory.push({
          role: "model",
          parts: [{ text: message.content }]
        });
      }
    });
    conversationHistory.push({
      role: "user",
      parts: [{ text: content }]
    });
    const chat = model.startChat({
      history: conversationHistory.slice(0, -1), 
    });
    const result = await chat.sendMessage(content);
    const aiResponse = result.response.text().trim();

    if (!aiResponse) {
      return NextResponse.json(
        { error: "Failed to generate AI response" },
        { status: 500 }
      );
    }
    const currentTime = new Date().toISOString();
    await serverClient.mutate({
      mutation: INSERT_MESSAGE,
      variables: { 
        chat_session_id, 
        content, 
        sender: "user",
        created_at: currentTime
      },
    });

    // Step 5: Save the AI's response in the database
    const aiMessageResult = await serverClient.mutate({
      mutation: INSERT_MESSAGE,
      variables: { 
        chat_session_id, 
        content: aiResponse, 
        sender: "ai",
        created_at: new Date().toISOString()
      },
    });

    // Step 6: Return the AI's response to the client
    return NextResponse.json({
      id: aiMessageResult.data.insertMessages.id,
      content: aiResponse,
    });

  } catch (error:any) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}