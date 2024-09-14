"use client";

import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import { toast } from "@/components/common/Toast";
import { useRouter } from "next/navigation";
import CryptoJS from 'crypto-js';

import {
  FriendListType,
  MessagesType,
  UserList,
  initialState,
  InitialStateInterface,
} from "@/context/ChatTypes";
import { connectToSmartContract } from "@/lib/Api";

export const ChatContext = createContext<InitialStateInterface>(initialState);

const encryptionKey = '5f7c90a602f2adf8180ec9f6ea9314db4bfe892315c2a8b237e99731ffe3d353'; // Use a secure key management solution in production

const encryptMessage = (message: string, key: string) => {
  return CryptoJS.AES.encrypt(message, key).toString();
};

const decryptMessage = (encryptedMessage: string, key: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    const originalMessage = bytes.toString(CryptoJS.enc.Utf8);
    if (originalMessage) {
      return originalMessage;
    } else {
      throw new Error("Failed to decrypt message");
    }
  } catch (e) {
    console.error("Decryption error:", e);
    return "";
  }
};

export const ChatProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [friendList, setFriendList] = useState<FriendListType[]>([]);
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [userList, setUserList] = useState<UserList[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [registeredUser, setRegisteredUser] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [checkMetamask, setCheckMetamask] = useState<boolean>(false);

  const router = useRouter();
  const crypto = require('crypto');
// const key = crypto.randomBytes(32).toString('hex'); // 256-bit key
// console.log("Generated Key:", key);

  const fetchUserData = async () => {
    try {
      if (!account) return;
      const contract = await connectToSmartContract();
      const friendsArray = await contract.getFriends();
      setFriendList(friendsArray);
      const getAllUsers = await contract.getAllAppUsers();
      setUserList(getAllUsers);
      const getBlockedUsers = await contract.getAllBlockedUsers();
      setBlockedUsers(getBlockedUsers);
      const getUserNickname = await contract.getUsername(account);
      setUsername(getUserNickname);
    } catch (err) {
      toast({
        title: "Error fetching user data",
        message:
          "It seems you don't have an account created. Please create an account to use the application.",
        type: "error",
      });
    }
  };

  const checkWalletConnection = async () => {
    try {
      if (!window.ethereum) {
        setCheckMetamask(false);
      } else {
        const walletAccounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setCheckMetamask(true);
        if (walletAccounts.length) {
          setAccount(walletAccounts[0]);
        }
        window.ethereum.on("accountsChanged", (accounts: string) => {
          if (accounts.length) {
            setAccount(accounts[0]);
          } else {
            setAccount("");
          }
        });
      }
    } catch (e) {
      toast({
        title: "Wallet is not connected",
        message: "Please download Metamask",
        type: "error",
      });
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setCheckMetamask(false);
        return;
      }

      await window.ethereum.enable();
      const walletAccounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(walletAccounts[0]);
      setCheckMetamask(true);
    } catch (e) {
      toast({
        title: "Wallet is not connected",
        message: "Please connect your wallet to use the application.",
        type: "error",
      });
    }
  };

  const createAccount = async ({ name }: { name: string }): Promise<void> => {
    setIsLoading(true);
    try {
      const contract = await connectToSmartContract();
      if (!name || !contract) return;
      const newUser = await contract.createUser(name);
      setRegisteredUser(newUser);
      await newUser.wait();
      setIsLoading(false);

      if (typeof window !== "undefined") {
        window.location.reload();
      }

      if (newUser) {
        toast({
          title: "Happy Chatting!",
          message: "Successfully created an account.",
          type: "success",
        });
      }

      router.push("/users");
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error creating an account",
        message:
          "It seems the account already exists. Please try again using another wallet.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async ({
    content,
    address,
  }: {
    content: string;
    address: string;
  }): Promise<void> => {
    setIsLoading(true);
    try {
      if (!content || !address) return;
      const encryptedContent = encryptMessage(content, encryptionKey);
      const contract = await connectToSmartContract();
      const newMessage = await contract.sendMessage(address, encryptedContent);
      await newMessage.wait();
      setIsLoading(false);
      if (newMessage) {
        toast({
          title: "Message Sent!",
          message: "Successfully sent a message to your friend.",
          type: "success",
        });
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error sending a message",
        message:
          "There seems to be an error sending a message. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const handleAddFriend = async ({
    address,
    name,
  }: {
    address: string;
    name: string;
  }): Promise<void> => {
    setIsLoading(true);
    try {
      if (!address || !name) return;
      const contract = await connectToSmartContract();
      const newFriend = await contract.addFriend(address, name);
      await newFriend.wait();
      setIsLoading(false);
      if (typeof window !== "undefined") {
        window.location.reload();
      }

      if (newFriend) {
        toast({
          title: "Added Successfully!",
          message: "Successfully added a new friend.",
          type: "success",
        });
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error adding a friend",
        message:
          "It seems you are adding an unregistered or a user that you blocked.",
        type: "error",
      });
    }
  };

  const handleBlockUser = async (address: string) => {
    setIsLoading(true);
    try {
      if (!address) return;
      const contract = await connectToSmartContract();
      const newBlockedUser = await contract.blockUser(address);
      await newBlockedUser.wait();
      toast({
        title: "Successfully blocked a user!",
        message: "User has been blocked and won't be able to message you.",
        type: "success",
      });
      setIsLoading(false);
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error blocking a user",
        message:
          "There seems to be an error while blocking this user. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnblockUser = async (address: string) => {
    setIsLoading(true);
    try {
      if (!address) return;
      const contract = await connectToSmartContract();
      const unblockedUser = await contract.unblockUser(address);
      await unblockedUser.wait();
      toast({
        title: "Successfully unblocked a user!",
        message: "You can now message the user to start a conversation.",
        type: "success",
      });
      setIsLoading(false);

      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Error unblocking a user",
        message:
          "There seems to be an error while unblocking this user. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getUsername = useCallback(
    async (address: string): Promise<string | undefined> => {
      try {
        if (!address) return;
        const contract = await connectToSmartContract();
        const currentUsername = await contract.getUsername(address);
        return currentUsername;
      } catch (err) {
        console.error("Error fetching username:", err);
        return undefined; // Return undefined in case of error
      }
    },
    [connectToSmartContract]
  );
  

  const getUserMessages = async (address: string) => {
    setIsLoading(true);
    try {
      if (!account && !registeredUser) {
        toast({
          title: "Error fetching user data",
          message: "Please create an account to access the application",
          type: "error",
        });
        return;
      }
  
      const contract = await connectToSmartContract();
      const encryptedMessages = await contract.readMessages(address);
  
      console.log("Encrypted Messages:", encryptedMessages);
  
      if (Array.isArray(encryptedMessages)) {
        const decryptedMessages: MessagesType[] = encryptedMessages.map((msg: any) => {
          console.log("Encrypted Message:", msg.content);
          const decryptedContent = decryptMessage(msg.content, encryptionKey);
          console.log("Decrypted Message:", decryptedContent);
  
          return {
            content: decryptedContent,
            sender: msg.sender,
            timestamp: msg.timestamp,
          };
        });
  
        setMessages(decryptedMessages);
      } else {
        toast({
          title: "Error",
          message: "Failed to retrieve messages.",
          type: "error",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        message: "There was an error retrieving messages.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    checkWalletConnection();
    fetchUserData();
  }, [account]);

  return (
    <ChatContext.Provider
      value={{
        isLoading,
        username,
        account,
        friendList,
        messages,
        userList,
        blockedUsers,
        currentUser,
        registeredUser,
        input,
        getUsername,
        setUsername,
        setAccount,
        setFriendList,
        setMessages,
        setUserList,
        setBlockedUsers,
        setCurrentUser,
        setRegisteredUser,
        setInput,
        checkMetamask,
        connectWallet,
        createAccount,
        handleSendMessage,
        handleAddFriend,
        handleBlockUser,
        handleUnblockUser,
        getUserMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);