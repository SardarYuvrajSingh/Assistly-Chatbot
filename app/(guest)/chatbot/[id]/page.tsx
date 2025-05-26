"use client";
import React from "react";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";
import startNewChat from "../../../../lib/startNewChat";
import Avatar from "../../../../components/Avatar";
import { useQuery } from "@apollo/client";
import {
  GetChatbotByIdResponse,
  Message,
  MessagesByChatSessionIdResponse,
  MessagesByChatSessionIdVariables,
} from "../../../../types/types";
import {
  GET_CHATBOT_BY_ID,
  GET_MESSAGES_BY_CHAT_SESSION_ID,
} from "../../../../graphql/queries/queries";
import Messages from "../../../../components/Messages";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";

const formSchema = z.object({
  message: z.string().min(2, "Your Message is too short!"),
});

function ChatbotPage() {
  const params = useParams();
  const id = params.id as string;
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState(true);
  const [chatId, setChatId] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const { data: chatBotData } = useQuery<GetChatbotByIdResponse>(
    GET_CHATBOT_BY_ID,
    {
      variables: { id },
    }
  );

  const {
    loading: loadingQuery,
    error,
    data,
  } = useQuery<
    MessagesByChatSessionIdResponse,
    MessagesByChatSessionIdVariables
  >(GET_MESSAGES_BY_CHAT_SESSION_ID, {
    variables: { chat_session_id: chatId },
    skip: !chatId,
  });

  React.useEffect(() => {
    if (data) {
      setMessages(data.chat_sessions.messages);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const chatId = await startNewChat(name, email, Number(id));
      setChatId(chatId);
      setIsOpen(false);
    } catch (error) {
      console.error("Error starting chat:", error);
    } finally {
      setLoading(false);
    }
  };

  async function handleMessageSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { message: FormMessage } = values;
    const message = FormMessage;
    form.reset();

    if (!name || !email) {
      setIsOpen(true);
      setLoading(false);
      return;
    }
    if (!message.trim()) {
      setLoading(false);
      return;
    }

    // Create unique IDs for optimistic updates
    const userMessageId = Date.now();
    const loadingMessageId = Date.now() + 1;

    // Optimistically update the UI with the user's message
    const userMessage: Message = {
      id: userMessageId,
      content: message,
      created_at: new Date().toISOString(),
      chat_session_id: chatId,
      sender: "user",
    };
    const loadingMessage: Message = {
      id: loadingMessageId,
      content: "Thinking...",
      created_at: new Date().toISOString(),
      chat_session_id: chatId,
      sender: "ai",
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      loadingMessage,
    ]);

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          chat_session_id: chatId,
          chatbot_id: id,
          content: message,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loadingMessageId
            ? { 
                ...msg, 
                content: result.content, 
                id: result.id || loadingMessageId
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === loadingMessageId
            ? { 
                ...msg, 
                content: "Sorry, I encountered an error. Please try again.", 
                id: loadingMessageId
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[450px] shadow-2xl border-0 rounded-2xl">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="mb-8 text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
                Let's Help You Out!
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-base mt-2 text-center">
                I just need a few details and then we're good to go ✨
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-700"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-200"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg transition-all duration-200"
                />
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Starting...</span>
                    </div>
                  ) : (
                    "Start Chatting 🚀"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl">
        <div className="px-6 py-5 flex items-center space-x-4">
          <div className="relative">
            <Avatar
              seed={chatBotData?.chatbots.name!}
              className="h-14 w-14 bg-white rounded-full border-3 border-white shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white truncate">
              {chatBotData?.chatbots.name}
            </h1>
            <div className="flex items-center space-x-1 text-blue-100">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-sm">Typically replies instantly</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden bg-white">
        <div className="h-full overflow-y-auto">
          <Messages
            messages={messages}
            chatbotName={chatBotData?.chatbots.name!}
          />
        </div>
      </div>
      <div className="border-t border-gray-200 bg-white shadow-2xl">
        <div className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleMessageSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Message</FormLabel>
                    <FormControl>
                      <div className="flex items-end space-x-4">
                        <div className="flex-1 relative">
                          <Input
                            placeholder="Type your message here..."
                            {...field}
                            className="h-14 pl-6 pr-4 text-base border-2 border-gray-200 focus:border-blue-500 rounded-2xl resize-none transition-all duration-200 shadow-sm focus:shadow-md"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="h-14 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                          disabled={
                            loading ||
                            form.formState.isSubmitting ||
                            !form.formState.isValid
                          }
                        >
                          <span className="flex items-center space-x-2">
                            <span>Send</span>
                            <span>📤</span>
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm text-red-500 mt-2" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ChatbotPage;