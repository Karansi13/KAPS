import { useState } from "react";
import React from "react";
const { ethers } = require("ethers");
var signer;
var provider;
var address;
export default function Wallet() {
  const [ad, setad] = useState("");

  async function connectWallet() {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    address = await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    setad(address);
    sp();
  }

  return (
    <div  className="rounded-xl text-white border font-bold p-3 w-32 bg-teal-600 dark:bg-purple-500 border-none block hover:scale-105"
    style={{
      backgroundColor: ""
    }}>
      {ad ? (
        <p>Connected: {ad}</p>
      ) : (
        <button 
        style={{
          backgroundColor: "#c084fc"
        }} onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
export function sp() {
  console.log(address);
  console.log(signer);
  console.log(provider);
  return [address, signer, provider];
}
