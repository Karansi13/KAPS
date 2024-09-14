import { Navigate, useNavigate } from "react-router-dom";

import React, { useState } from "react";
import "./style.css";
import { sp } from "../components/Wallet";
import Wallet from "../components/Wallet";
const { ethers } = require("ethers");

export default function Authorize() {
  const navigate = useNavigate();

  const [ad, setad] = useState();
  let conadd = "0x3898fFD5e7001Cade4Fd6118ae0CeF1F53875FbB";

  async function a() {
    const contractArtifacts = require("./artifacts/contracts/Identity.sol/IdentityManagement.json");
    const contractABI = contractArtifacts.abi;
    var x = sp();
    var address = x[0];
    var signer = x[1];
    var provider = x[2];
    console.log(address);
    if (signer === undefined) {
      window.alert("Connect wallet");
    } else {
      var addd = address.toString();

      const contract = new ethers.Contract(conadd, contractABI, signer);

      const values = {
        gasLimit: 1000000,
      };
      const tx5 = await contract.showAuthorization(addd, values);
      if (tx5 == true) {
        window.alert("Identified user");
      } else {
        const tx2 = await contract.grantAuthorization(addd, values);

        const receipt2 = await tx2.wait();

        console.log(receipt2.status);

        if (receipt2.status === 1) {
          window.alert("Transaction successful!");
          console.log("sucess");
          navigate("/info");
        }
      }
    }
  }
  return (
    <div className="main">
      <div style={{ alignItems: "right", float: "right" }}>
        <Wallet></Wallet>
      </div>
      <div
        // style={{
        //   height: "97px",
        //   width: "1900px",
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        // }}
      >
        <center>
          <h1>Authorize</h1>
        </center>
      </div>
      <form
        style={{
          textAlign: "center",
          width: "1590px",
          height: "445px",
          margin: "150px",
        }}
      >
        <button type="button" onClick={a} style={{ marginTop: "10px" }}>
          Authorize
        </button>
      </form>
      <footer style={{ textAlign: "center", paddingBottom: "20px" }}>
        XKAPS
      </footer>
    </div>
  );
}
