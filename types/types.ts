export interface Chatbot {
  id: number;
  clerk_user_id: string;
  name: string;
  created_at: string;
  chatbot_characteristics: ChatbotCharacteristic[];
  chat_sessions: ChatSession[];
}

export interface ChatbotCharacteristic {
  id: number;
  chatbot_id: number;
  content: string;
  created_at: string;
}

export interface Guest{
    id: string;
    name: string;
    email: string;
    created_at: string;
}

export interface ChatSession {
  guests: any;
  id: number;
  chatbot_id: number;
  guest_id: string | null;
  created_at: string;
  messages: Message[];
  guest: Guest;
}

export interface Message {
    id: number;
    chat_session_id: number;
    content: string;
    created_at: string;
    sender: "ai" | "user";
}

export interface GetChatbotByIdResponse {
  chatbots: Chatbot;
}

export interface GetChatbotByIdVariables {
  id: string;
}

export interface GetChatbotsByUserData {
  chatbotsByUser: Chatbot[];
}

export interface GetChatbotsByUserDataVariables {
  clerk_user_id: string;
}

export interface GetUserChatbotsResponse {
  chatbotsList: Chatbot[];
}

export interface GetUserChatbotsVariables {
  userId:string;
}

export interface GetChatSessionMessagesResponse {
  chat_sessions: {
    id: number;
    created_at: string;
    messages: Message[];
    chatbots: {
      name: string;
    };
    guests: {
      name: string;
      email: string;
    };
  }
}

export interface GetChatSessionMessagesVariables {
  id: number;
}

export interface MessagesByChatSessionIdResponse{
  chat_sessions: ChatSession;
}

export interface MessagesByChatSessionIdVariables{
  chat_session_id: number;
}