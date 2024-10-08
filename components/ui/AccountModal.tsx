"use client";
import { useState, FC, SetStateAction } from "react";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import Heading from "@/components/common/Heading";

import { useChatContext } from "@/context/KAPS.context";

interface ModalProps {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}

const AccountModal: FC<ModalProps> = ({ setOpenModal }) => {
  const [name, setName] = useState<string>("");

  const { account, isLoading, createAccount } = useChatContext();

  return (
    <div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center bg-opacity-0">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-gray-800 text-white rounded-lg px-6 h-[400px] sm:p-8 mx-4 sm:mx-auto w-full max-w-md">
          <Heading size="sm" className="text-2xl font-bold mb-8">
            Create Your Account
          </Heading>
          <div className="mb-8">
            <label htmlFor="username" className="block font-medium">
              Username
            </label>
            <Input
              type="text"
              id="username"
              className="w-full text-black dark:text-white border-gray-300 dark:border-gray-600 outline-none mt-2 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="walletAddress" className="block font-medium">
              Wallet Address
            </label>
            <Input
              type="text"
              id="walletAddress"
              className="w-full border-gray-300 text-slate-500 dark:border-gray-600 outline-none py-2 px-3 mt-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
              readOnly
              value={account}
            />
          </div>
          <div className="flex justify-end mt-16">
            <Button
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md mr-2 hover:scale-105"
              onClick={() => setOpenModal((prev) => !prev)}
              label="Cancel"
            />
            <Button
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 dark:bg-purple-500 rounded-md hover:scale-105"
              disabled={account ? false : true}
              onClick={() => createAccount({ name })}
              label="Register"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountModal;
