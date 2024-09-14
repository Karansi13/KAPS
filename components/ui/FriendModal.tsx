// "use client";
// import { useState, FC, SetStateAction } from "react";

// import Input from "@/components/common/Input";
// import Button from "@/components/common/Button";
// import Loading from "@/components/common/Loading";
// import Heading from "@/components/common/Heading";

// import { useChatContext } from "@/context/KAPS.context";

// interface ModalProps {
//   setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
// }

// const FriendModal: FC<ModalProps> = ({ setIsModalOpen }) => {
//   const [name, setName] = useState<string>("");
//   const [address, setAddress] = useState<string>("");
//   const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
//   const { handleAddFriend } = useChatContext(); // MetaMask function (shouldn't run until verification is complete)

//   const handleFriendAddition = () => {
//     // Open the verification modal but don't trigger MetaMask here
//     setIsVerificationModalOpen(true);
//   };

//   return (
//     <>
//       {/* Initial Friend Modal */}
//       {!isVerificationModalOpen && (
//         <div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center bg-opacity-0">
//           <div className="bg-gray-800 rounded-lg p-6 sm:p-8 mx-4 sm:mx-auto w-full max-w-md">
//             <Heading size="sm" className="text-2xl text-white font-bold mb-4">
//               Add Friends
//             </Heading>
//             <div className="mb-4 text-white">
//               <label htmlFor="nickname" className="block font-medium">
//                 Nickname
//               </label>
//               <Input
//                 type="text"
//                 id="nickname"
//                 className="w-full text-black dark:text-white border-gray-300 dark:border-gray-600 outline-none py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
//                 value={name}
//                 required
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="mb-6 text-white">
//               <label htmlFor="walletAddress" className="block font-medium">
//                 Wallet Address
//               </label>
//               <Input
//                 type="text"
//                 id="walletAddress"
//                 className="w-full text-black dark:text-white border-gray-300 dark:border-gray-600 outline-none py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
//                 value={address}
//                 required
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//             </div>
//             <div className="flex justify-end">
//               <Button
//                 className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md mr-2 hover:scale-105"
//                 onClick={() => setIsModalOpen((prev) => !prev)}
//                 label="Cancel"
//               />

//               <Button
//                 className="px-4 py-2 text-sm font-medium text-white bg-teal-600 dark:bg-blue-600 rounded-md hover:scale-105"
//                 onClick={handleFriendAddition}
//                 label="Add Friend"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Verification Modal */}
//       {isVerificationModalOpen && (
//         <VerificationModal
//           setIsVerificationModalOpen={setIsVerificationModalOpen}
//           handleAddFriend={() => handleAddFriend({ address, name })} // Run MetaMask here after verification
//         />
//       )}
//     </>
//   );
// };

// // Verification Modal Component
// interface VerificationModalProps {
//   setIsVerificationModalOpen: React.Dispatch<SetStateAction<boolean>>;
//   handleAddFriend: () => void; // Pass in the MetaMask function here
// }

// const VerificationModal: FC<VerificationModalProps> = ({
//   setIsVerificationModalOpen,
//   handleAddFriend,
// }) => {
//   const [isVerified, setIsVerified] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleVerification = () => {
//     setIsLoading(true);
//     // Simulate a 2-second delay for user verification
//     setTimeout(() => {
//       setIsVerified(true); // Mark the user as verified
//       setIsLoading(false);

//       // Show a brief "User Verified" message before triggering MetaMask
//       setTimeout(() => {
//         handleAddFriend(); // Trigger MetaMask (add friend) after verification
//         setIsVerificationModalOpen(false); // Close the verification modal after MetaMask interaction
//       }, 3000); // 1 second to show the "User Verified" message before MetaMask opens
//     }, 4000); // 2-second delay for verification
//   };

//   return (
//     <div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center bg-opacity-0">
//       <div className="bg-gray-800 rounded-lg p-6 sm:p-8 mx-4 sm:mx-auto w-full max-w-md">
//         <Heading size="sm" className="text-2xl text-white font-bold mb-4">
//           User Verification
//         </Heading>
//         {!isVerified ? (
//           <div className="flex items-center mb-4 text-white">
//             {isLoading ? (
//               <Loading />
//             ) : (
//               <>
//                 <input
//                   type="checkbox"
//                   id="verifyUser"
//                   className="mr-2 h-5 w-5"
//                   onChange={handleVerification}
//                 />
//                 <label htmlFor="verifyUser" className="font-medium">
//                   Verify the authenticity of the user
//                 </label>
//               </>
//             )}
//           </div>
//         ) : (
//           <div className="text-white text-lg font-medium">
//             Verification process is complete, User is Verified! ✅ 
//           </div>
//         )}
//         <div className="flex justify-end mt-4">
//           <Button
//             className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md"
//             onClick={() => setIsVerificationModalOpen(false)}
//             label="Close"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };



// export default FriendModal;

"use client"
import { useState, FC, SetStateAction } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import Heading from "@/components/common/Heading";

import { useChatContext } from "@/context/KAPS.context";

// Random user data (as an example)
const existingUser = {
  id: "f8e9b7d1-731a-42fb-93bc-0e329e1a59c4",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1-555-432-7890",
  walletAddress: "0x66FC5031F79f93a6635b0F45bBd47BF2a29305ae",
  verificationStatus: {
    isVerified: false,
    verificationDate: null,
    verificationMethod: "KYC",
  },
  address: {
    street: "1234 Elm Street",
    city: "Springfield",
    state: "IL",
    zipCode: "62704",
    country: "USA",
  },
  createdAt: "2024-09-14T10:25:45Z",
  lastLogin: "2024-09-14T12:45:00Z",
  metadata: {
    loginAttempts: 3,
    device: "iPhone 14",
    browser: "Safari",
  },
};

interface ModalProps {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FriendModal: FC<ModalProps> = ({ setIsModalOpen }) => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { handleAddFriend } = useChatContext(); // MetaMask function (shouldn't run until verification is complete)

  const handleFriendAddition = () => {
    // Check if the wallet address matches with the existing user
    if (address !== existingUser.walletAddress) {
      setErrorMessage("Wallet address does not match the user's wallet.");
    } else {
      setIsVerificationModalOpen(true); // Proceed to verification if wallet matches
      setErrorMessage(null); // Clear any previous error messages
    }
  };

  return (
    <>
      {/* Initial Friend Modal */}
      {!isVerificationModalOpen && (
        <div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center bg-opacity-0">
          <div className="bg-gray-800 rounded-lg p-6 sm:p-8 mx-4 sm:mx-auto w-full max-w-md">
            <Heading size="sm" className="text-2xl text-white font-bold mb-4">
              Add Friends
            </Heading>
            <div className="mb-4 text-white">
              <label htmlFor="nickname" className="block font-medium">
                Nickname
              </label>
              <Input
                type="text"
                id="nickname"
                className="w-full text-black dark:text-white border-gray-300 dark:border-gray-600 outline-none py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6 text-white">
              <label htmlFor="walletAddress" className="block font-medium">
                Wallet Address
              </label>
              <Input
                type="text"
                id="walletAddress"
                className="w-full text-black dark:text-white border-gray-300 dark:border-gray-600 outline-none py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="flex justify-end">
              <Button
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md mr-2 hover:scale-105"
                onClick={() => setIsModalOpen((prev) => !prev)}
                label="Cancel"
              />

              <Button
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 dark:bg-blue-600 rounded-md hover:scale-105"
                onClick={handleFriendAddition}
                label="Add Friend"
              />
            </div>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {isVerificationModalOpen && (
        <VerificationModal
          setIsVerificationModalOpen={setIsVerificationModalOpen}
          handleAddFriend={() => handleAddFriend({ address, name })} // Run MetaMask here after verification
        />
      )}
    </>
  );
};

// Verification Modal Component
interface VerificationModalProps {
  setIsVerificationModalOpen: React.Dispatch<SetStateAction<boolean>>;
  handleAddFriend: () => void; // Pass in the MetaMask function here
}

const VerificationModal: FC<VerificationModalProps> = ({
  setIsVerificationModalOpen,
  handleAddFriend,
}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = () => {
    setIsLoading(true);
    // Simulate a 2-second delay for user verification
    setTimeout(() => {
      setIsVerified(true); // Mark the user as verified
      setIsLoading(false);

      // Show a brief "User Verified" message before triggering MetaMask
      setTimeout(() => {
        handleAddFriend(); // Trigger MetaMask (add friend) after verification
        setIsVerificationModalOpen(false); // Close the verification modal after MetaMask interaction
      }, 3000); // 1 second to show the "User Verified" message before MetaMask opens
    }, 4000); // 2-second delay for verification
  };

  return (
    <div className="fixed backdrop-blur-sm inset-0 flex items-center justify-center bg-opacity-0">
      <div className="bg-gray-800 rounded-lg p-6 sm:p-8 mx-4 sm:mx-auto w-full max-w-md">
        <Heading size="sm" className="text-2xl text-white font-bold mb-4">
          User Verification
        </Heading>
        {!isVerified ? (
          <div className="flex items-center mb-4 text-white">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <input
                  type="checkbox"
                  id="verifyUser"
                  className="mr-2 h-5 w-5"
                  onChange={handleVerification}
                />
                <label htmlFor="verifyUser" className="font-medium">
                  Verify the authenticity of the user
                </label>
              </>
            )}
          </div>
        ) : (
          <div className="text-white text-lg font-medium">
            Verification process is complete, User is Verified! ✅ 
          </div>
        )}
        <div className="flex justify-end mt-4">
          <Button
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md"
            onClick={() => setIsVerificationModalOpen(false)}
            label="Close"
          />
        </div>
      </div>
    </div>
  );
};



export default FriendModal;
