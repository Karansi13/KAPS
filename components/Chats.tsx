"use client";

import { FC, useState } from "react";
import { useSearchParams } from "next/navigation";

import Icons from "@/components/Icons";
import Messages from "@/components/Messages";
import FriendList from "@/components/FriendList";
import Announcement from "@/components/Announcement";

import InputBox from "@/components/ui/InputBox";
import Loading from "@/components/common/Loading";
import EmptyMessage from "@/components/common/EmptyMessage";

import { useChatContext } from "@/context/KAPS.context";

import Image from "next/image";

const Chats: FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const params = useSearchParams();

  const {
    handleSendMessage,
    isLoading,
    handleBlockUser,
    setMessages,
    messages,
  } = useChatContext();

  // useEffect(() => {
  //   const handleEvent = (error: Error, event: any) => {
  //     if (!error) {
  //       // Event triggered, handle the event
  //       const { sender, recipient, content } = event.returnValues;
  //       console.log(event);
  //       // Trigger a re-render
  //       setMessages([...messages, event]);
  //     }
  //   };

  //   const subscribeToEvent = async () => {
  //     const contract = await connectToSmartContract();
  //     // Subscribe to the event
  //     contract.on("MessageSent", handleEvent);

  //     // Clean up the event subscription when the component unmounts
  //     return () => {
  //       contract.off("MessageSent", handleEvent);
  //     };
  //   };

  //   subscribeToEvent();
  // }, []);

  return (
    <>
      <div className="flex justify-center">
        {/* <Announcement /> */}
      </div>
      <div className="flex flex-row w-full">
        <div className="container">
          <div className=" md:flex md:flex-row mx-20">
            <FriendList
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />

            <div className="w-full text-black md:rounded-r-lg bg-[#813ea5]">
              {isLoading ? (
                <Loading />
              ) : (
                <div className="h-full flex flex-col w-full">
                  
                  <div className="flex bg-[#813ea5] md:rounded-tr-lg justify-between px-2 py-2">
                    {params?.get("friendkey") ? (
                      <>
                        <p className="text-gray-200">Getting spammed by this user?</p>
                        <Icons.Ban
                          size={17}
                          className="self-center text-red-400 cursor-pointer hover:scale-105"
                          onClick={() =>
                            handleBlockUser(params?.get("friendkey") || "")
                          }
                        />
                      </>
                    ) : (
                      <p className="text-gray-200">
                        Select a <span className="text-yellow-200">friend</span>{" "}
                        to start a conversation
                      </p>
                    )}
                  </div>
                  <div className="overflow-y-scroll flex-grow max-h-[700px] bg-slate-200 w-full min-h-[600px] p-5">
                  {/* <Image
              src={chatWallpaper}
              // className="rounded-full"
              alt="image"
              // height={50}
                          /> */}
                    {selectedUser ? (
                      <Messages />
                    ) : (
                      <div>{<EmptyMessage />}</div>
                    )}
                  </div>
                  <InputBox sendMessage={handleSendMessage} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;