import { gql } from "@apollo/client";
import client from "../graphql/apolloClient";
import {
  INSERT_CHATSESSION,
  INSERT_GUEST,
  INSERT_MESSAGE,
} from "../graphql/mutations/mutation";

async function startNewChat(
  guestName: string,
  guestEmail: string,
  chatbotId: number
) {
  try {
    // Create a new guest entry in the database
    const guestResult = await client.mutate({
      mutation: INSERT_GUEST,
      variables: { name: guestName, email: guestEmail, created_at: new Date().toISOString() },
    });

    const guestId = guestResult.data.insertGuests.id;

    // Initialise a new chat session with the guest and chatbot
    const chatSessionResult = await client.mutate({
      mutation: INSERT_CHATSESSION,
      variables: { chatbot_id: chatbotId, guest_id: guestId, created_at: new Date().toISOString()},
    });

    const chatSessionId = chatSessionResult.data.insertChat_sessions.id;

    //Insert initial message
    await client.mutate({
      mutation: INSERT_MESSAGE,
      variables: {
        chat_session_id: chatSessionId,
        sender: "ai",
        content: `Welcome ${guestName}!\nHow can I assist you today? 😊`,
        created_at: new Date().toISOString(),
      },
    });
    console.log("New chat session started successfully: ", chatSessionId);
    return chatSessionId;
  } catch (error) {
    console.error("Error starting new chat session: ", error);
  }
}

export default startNewChat;