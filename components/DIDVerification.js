// import React, { useState } from 'react';
// import { useDID } from '@/context/DIDContext';
// import { toast } from '@/components/common/Toast';

// const DIDVerification = ({ onVerificationSuccess }: { onVerificationSuccess: () => void }) => {
//   const { did, createDID, verifyDID } = useDID();
//   const [partnerDID, setPartnerDID] = useState<string>('');

//   const handleVerifyDID = async () => {
//     if (!partnerDID) {
//       toast({ title: 'Error', message: 'Please enter a valid DID', type: 'error' });
//       return;
//     }

//     const isValid = await verifyDID(partnerDID);
//     if (isValid) {
//       toast({ title: 'Success', message: 'DID verified successfully', type: 'success' });
//       onVerificationSuccess();
//     } else {
//       toast({ title: 'Error', message: 'DID verification failed', type: 'error' });
//     }
//   };

//   return (
//     <div>
//       <h2>Verify Partner's DID</h2>
//       <input
//         type="text"
//         placeholder="Enter partner's DID"
//         value={partnerDID}
//         onChange={(e) => setPartnerDID(e.target.value)}
//       />
//       <button onClick={handleVerifyDID}>Verify DID</button>
//     </div>
//   );
// };

// export default DIDVerification;

