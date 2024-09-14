"use client";

import { FC, useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { Icons } from "@/components/Icons";
import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import { useChatContext } from "@/context/KAPS.context";
import Input from "@/components/common/Input";

interface UserData {
  name: string;
  friendkey: string;
}

interface MessageTypes {
  sendMessage: ({
    content,
    address,
  }: {
    content: string;
    address: string;
  }) => "" | Promise<void>;
}

const InputBox: FC<MessageTypes> = ({ sendMessage }) => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    friendkey: "",
  });

  const {
    getUserMessages,
    isLoading,
    input: content,
    setInput,
    messages,
    currentUser,
  } = useChatContext();

  const params = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // File input reference

  useEffect(() => {
    if (!params) return;
    setUserData({
      name: params.get("name") || "",
      friendkey: params.get("friendkey") || " ",
    });
  }, [params]);

  const handleInputChange = useCallback(() => {
    const searchValue = inputRef.current?.value || "";
    setInput(searchValue);
  }, [setInput]);

  useEffect(() => {
    if (userData.friendkey) {
      getUserMessages(userData.friendkey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const handleEnterKeyPress = () => {
    if (content && userData.friendkey) {
      sendMessage({ content, address: userData.friendkey });
    }
  };

  // Trigger file upload on media icon click
  const handleMediaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Files selected:", files);
      // Handle file upload logic here (send files to server)
    }
  };

  // Placeholder function for voice message
  const handleVoiceClick = () => {
    console.log("Voice message recording started.");
    // Implement voice recording functionality here
  };

  return (
    <>
      <div className="flex py-2 gap-2 relative my-4 mx-4">
        <Input
          type="text"
          ref={inputRef}
          name="message"
          placeholder="Message..."
          className="bg-white rounded-full outline-none py-2 px-3 w-[90%]"
          readOnly={currentUser ? false : true}
          onChange={handleInputChange}
          onEnter={handleEnterKeyPress}
        />
        
        <div className="flex ">
        <button
          type="button"
          onClick={handleMediaClick}
          className="p-2 text-black mt-1 rounded-full hover:scale-105 cursor-pointer"
        >
          <Icons.Paperclip  size={20} className="text-white"/>
        </button>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
        />

        {/* Voice Message Icon */}
        <button
          type="button"
          onClick={handleVoiceClick}
          className="p-2 text-black mt-1 rounded-full hover:scale-105 cursor-pointer"
        >
          <Icons.Mic size={20} className="text-white"/>
        </button>

        <Button
          onClick={() =>
            sendMessage({ content: content, address: userData.friendkey })
          }
          className="p-2 text-black mt-1 rounded-full hover:scale-105 cursor-pointer"
          disabled={isLoading}
          label={isLoading ? <Loading /> : <Icons.Send size={20} className="text-white cursor-pointer" />}
        />
      </div>
      </div>
    </>
  );
};

export default InputBox;
