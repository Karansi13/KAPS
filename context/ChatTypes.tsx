export type FriendListType = {
  name: string;
  friendkey: string;
};

export type MessagesType = {
  content: string;
  sender: string;
  timestamp: string;
};
// export interface MessageType ={
//   content: string;
//   sender: string;
//   timestamp: number;
// }

export interface EncryptionKeys {
  publicKey: CryptoKey;
  privateKey: CryptoKey;
}

export interface UserList {
  name: string;
  accountAddress: string;
}

export interface InitialStateInterface {
  isLoading: boolean;
  account: string;
  username: string;
  friendList: FriendListType[];
  messages: MessagesType[];
  userList: UserList[];
  blockedUsers: string[];
  checkMetamask: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  currentUser: string;
  connectWallet: () => Promise<void> | "";
  setMessages: React.Dispatch<React.SetStateAction<MessagesType[]>>;
  createAccount: ({ name }: { name: string }) => Promise<void> | "";
  getUserMessages: (address: string) => Promise<void> | [];
  getUsername: (address: string) => Promise<string | undefined> | "";
  handleSendMessage: ({
    content,
    address,
  }: {
    content: string;
    address: string;
  }) => Promise<void> | "";
  handleAddFriend: ({
    address,
    name,
  }: {
    address: string;
    name: string;
  }) => Promise<void> | "";
  handleBlockUser: (address: string) => Promise<void> | "";
  handleUnblockUser: (address: string) => Promise<void> | "";
}


export const initialState: InitialStateInterface = {
  isLoading: false,
  checkMetamask: false,
  account: "",
  username: "",
  friendList: [],
  messages: [],
  userList: [],
  blockedUsers: [],
  currentUser: "",
  setMessages: () => {}, // Provide a no-op function
  setCurrentUser: () => {}, // Provide a no-op function
  input: "",
  setInput: () => {}, // Provide a no-op function
  connectWallet: async () => {}, // Provide a no-op async function
  createAccount: async ({ name }: { name: string }) => {}, // Provide a no-op async function
  getUserMessages: async (address: string) => [], // Provide a no-op async function
  getUsername: async (address: string) => undefined, // Provide a no-op async function
  handleSendMessage: async ({ content, address }: { content: string; address: string }) => {}, // Provide a no-op async function
  handleAddFriend: async ({ address, name }: { address: string; name: string }) => {}, // Provide a no-op async function
  handleBlockUser: async (address: string) => {}, // Provide a no-op async function
  handleUnblockUser: async (address: string) => {}, // Provide a no-op async function
};