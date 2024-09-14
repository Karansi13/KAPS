import { Navigate, useNavigate } from "react-router-dom";

import React, { useState } from "react";
import "./style.css";
import { sp } from "../components/Wallet";
import Wallet from "../components/Wallet";
const { ethers } = require("ethers");

let conadd = "0x3898fFD5e7001Cade4Fd6118ae0CeF1F53875FbB";

export default function Info() {
  const navigate = useNavigate();

  const [name, setname] = useState("Name:");
  const [dob, setage] = useState("DOB:");
  const [aadhar, setnat] = useState("Aadhar:");
  const [id1, sethei] = useState("Identification mark:");

  async function a() {
    const contractArtifacts = require("./artifacts/contracts/Identity.sol/IdentityManagement.json");
    const contractABI = contractArtifacts.abi;
    var x = sp();
    var address = x[0];
    var signer = x[1];
    var provider = x[2];
    console.log(address);
    console.log(signer);

    if (signer === undefined) {
      window.alert("Connect wallet");
    } else {
      var addd = address.toString();

      const contract = new ethers.Contract(conadd, contractABI, signer);

      const values = {
        gasLimit: 1000000,
      };
      const tx4 = await contract.showAuthorization(addd, values);
      if (tx4 == false) {
        window.alert("Unedified user");
        navigate("/authorize");
      } else {
        const tx3 = await contract.getIdentity(addd, values);
        var name = tx3[0];
        var dob = tx3[1];
        var aadhar = tx3[2];
        var id1 = tx3[3];
        setname("Name: " + name);
        setage("DOB: " + dob);
        setnat("Aadhar: " + aadhar);
        sethei("Identification marks: " + id1);
      }
    }
  }
  async function revoke() {
    const contractArtifacts = require("./artifacts/contracts/Identity.sol/IdentityManagement.json");
    const contractABI = contractArtifacts.abi;
    var x = sp();
    var address = x[0];
    var signer = x[1];
    var provider = x[2];
    console.log(address);
    console.log(signer);

    if (signer === undefined) {
      window.alert("Connect wallet");
    } else {
      var addd = address.toString();

      const contract = new ethers.Contract(conadd, contractABI, signer);

      const values = {
        gasLimit: 1000000,
      };
      const tx6 = await contract.showAuthorization(addd, values);
      if (tx6 == false) {
        window.alert("Unedified user");
        navigate("/authorize");
      } else {
        const tx3 = await contract.revokeAuthorization(addd, values);
        const receipt3 = await tx3.wait();
        console.log(receipt3.status);

        if (receipt3.status === 1) {
          window.alert("Transaction successful!");
          console.log("sucess");
          navigate("/authorize");
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
        style={{
          height: "97px",
          width: "1900px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <center>
          <h1>Your Identity</h1>
        </center>
      </div>
      <form
        style={{
          textAlign: "center",
          width: "1900px",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button type="button" onClick={a} style={{ marginTop: "10px" }}>
          Get info
        </button>
      </form>
      <center>
        <div
          style={{
            height: "97px",
            width: "500px",
            textAlign: "center",
            marginTop: "200px",
            marginBottom: "348px",
          }}
        >
          <input placeholder={name} disabled />
          <input placeholder={dob} disabled />
          <input placeholder={aadhar} disabled />
          <input placeholder={id1} disabled />
          <button type="button" onClick={revoke} style={{ marginTop: "10px" }}>
            Revoke Authorization
          </button>
        </div>
      </center>

      <footer style={{ textAlign: "center", paddingBottom: "20px" }}>
XKAPS      </footer>
    </div>
  );
}
