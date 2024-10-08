import { FC } from "react";

import { formattedTime } from "@/lib/Api";
import { MessagesType } from "@/context/ChatTypes";
import { useChatContext } from "@/context/KAPS.context";

interface MessagesProps {
  message: MessagesType;
}

const MessageCard: FC<MessagesProps> = ({ message }) => {
  const { account } = useChatContext();

  return (
    <>
      <div
        className={
          message.sender.toLowerCase() === account.toLowerCase()
            ? "text-right"
            : "text-left"
        }
      >
        <div
          className={
            "text-left inline-block p-2 my-2 rounded-md text-sm " +
            (message.sender.toLowerCase() === account.toLowerCase()
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-500")
          }
        >
          <p className="max-w-[100%]">{message.content}</p>
          <p className="flex text-[10px] text-left justify-end">
            {formattedTime(message.timestamp)}
          </p>
        </div>
      </div>
    </>
  );
};
export default MessageCard;
