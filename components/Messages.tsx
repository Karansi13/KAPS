import MessageCard from "@/components/ui/MessageCard";
import { useChatContext } from "@/context/KAPS.context";

const Messages = () => {
  const { messages } = useChatContext();

  return (
    <>
      {messages.map((message, index) => (
        <MessageCard key={index} message={message} />
      ))}
    </>
  );
};
export default Messages;
