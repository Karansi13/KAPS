"use client";

import { FC, useCallback, useState } from "react";

import { Icons } from "@/components/Icons";
import FriendCard from "@/components/ui/FriendCard";
import BlockModal from "@/components/ui/BlockedModal";

import { useChatContext } from "@/context/KAPS.context";

interface FriendListProps {
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
}

const FriendList: FC<FriendListProps> = ({ selectedUser, setSelectedUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { username, friendList } = useChatContext();

  const toggleBlockModal = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getUserName = useCallback((username: string) => {
    if (!username) return;

    if (username.length > 8) {
      return username.charAt(0).toUpperCase() + username.slice(1, 6);
    } else {
      return username;
    }
  }, []);

  return (
    <>
      <div className=" p-2 md:w-[200px] text-white md:rounded-l-lg mb-4 md:mb-0 relative bg-[#813ea5]">
        <div className="my-3 gap-2">
          <div className="flex justify-between border-b border-gray-400 mb-2 mx-3">
            <div className="mb-2">
              <h1>{getUserName(username)}</h1>
            </div>
            <div className="flex">
              <div onClick={toggleBlockModal} className="hover:scale-125">
                <Icons.MoreVertical size={20} />
              </div>
              {isDropdownOpen && (
                <BlockModal toggleBlockModal={toggleBlockModal} />
              )}
            </div>
          </div>
          {friendList.map((friend, index) => (
            <FriendCard
              key={index}
              index={index}
              selectFriend={setSelectedUser}
              selectedUser={selectedUser}
              friend={friend}
              getUsername={getUserName}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendList;