import { JSX } from "react";
import Messages from "../../../../components/Messages";
import { GET_CHAT_SESSION_MESSAGES } from "../../../../graphql/queries/queries";
import { serverClient } from "../../../../graphql/serverClient";
import { GetChatSessionMessagesResponse, GetChatSessionMessagesVariables } from "../../../../types/types";

export const dynamic = 'force-dynamic';

type ReviewSessionPageProps = {
params: Promise<{ id: string }>;

};

async function ReviewSession({ params }: ReviewSessionPageProps): Promise<JSX.Element> {
  const { id } = await params;

  const {
    data: {
      chat_sessions: {
        id: chatSessionId,
        created_at,
        messages,
        chatbots: { name },
        guests: { name: guestName, email },
      },
    },
  } = await serverClient.query<
    GetChatSessionMessagesResponse,
    GetChatSessionMessagesVariables
  >({
    query: GET_CHAT_SESSION_MESSAGES,
    variables: { id: parseInt(id) },
  });

  return (
    <div className="flex-1 p-10 pb-24">
      <h1 className="text-xl lg:text-3xl font-semibold">Session Review</h1>
      <p className="font-light text-sm text-gray-500 mt-2">
        started at {new Date(created_at).toLocaleString()}
      </p>
      <h2 className="font font-light mt-2">Between {name} &{" "}</h2>
      <span className="font-extrabold">
        {guestName} ({email})
      </span>
      <hr className="my-10" />
      <Messages messages={messages} chatbotName={name} />
    </div>
  );
}

export default ReviewSession;