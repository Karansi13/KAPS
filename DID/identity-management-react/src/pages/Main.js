/* eslint-disable react/no-direct-mutation-state */

import React, { useState } from "react";
import "./style.css";
import { Navigate, useNavigate } from "react-router-dom";
import Wallet from "../components/Wallet";
import { sp } from "../components/Wallet";
const { ethers } = require("ethers");
export default function RegisterIdentity() {
  const navigate = useNavigate();

  let conadd = "0x3898fFD5e7001Cade4Fd6118ae0CeF1F53875FbB";
  const [name, setName] = useState();
  const [dob, setAge] = useState();
  const [aadhar, setNationality] = useState();
  const [id1, setHeight] = useState();
  const register = async () => {
    const contractArtifacts = require("./artifacts/contracts/Identity.sol/IdentityManagement.json");
    const contractABI = contractArtifacts.abi;
    var x = sp();
    var address = x[0];
    var signer = x[1];
    var provider = x[2];
    if (signer === undefined) {
      window.alert("Connect wallet");
    } else {
      if (name === undefined) {
        window.alert("Enter name");
      } else {
        if (dob === undefined) {
          window.alert("Enter Date of birth");
        } else {
          if (aadhar === undefined) {
            window.alert("Enter AadharCard No.");
          } else {
            if (id1 === undefined) {
              alert("Enter Identification Mark");
            } else {
              const contract = new ethers.Contract(conadd, contractABI, signer);

              const values = {
                gasLimit: 1000000,
              };
              try {
                const tx = await contract.registerIdentity(
                  name,
                  dob,
                  aadhar,
                  id1,
                  values
                );

                const receipt = await tx.wait();
                console.log(receipt.status);

                if (receipt.status === 1) {
                  window.alert("Transaction successful!");
                  console.log("sucess");
                  navigate("/authorize");
                }
              } catch (error) {
                window.alert("Transaction Failed!");
              }
            }
          }
        }
      }
    }
  };

  return (
    <div className="main" 
    style={{backgroundColor: "#1a1a1a"}}>
      <div style={{ alignItems: "right", float: "right" }}>
        <Wallet></Wallet>
      </div>
      <div
        style={{
          height: "97px",
          // width: "1900px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <center>
          <h1 style={{color: "white", marginLeft: "10rem"}}>Identify Yourself</h1>
        </center>
      </div>
      <center>
        <form
          style={{
            textAlign: "center",
    width: "330px",
    height: "380px",
    margin: "100px",
    border: "1px solid black",
    backgroundColor: "white",
    borderRadius: "3rem",
    padding: "2rem"
          }}
        >
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <input

            placeholder="DOB"
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            placeholder="Aadhar Number"
            onChange={(e) => setNationality(e.target.value)}
          />
          <input
            placeholder="Identification Mark"
            onChange={(e) => setHeight(e.target.value)}
          />
          <button
            type="button"
            onClick={register}
            style={{ marginTop: "10px",
              backgroundColor: "#c084fc"
             }}
          >
            Register
          </button>
        </form>
      </center>
      <footer style={{ textAlign: "center", paddingBottom: "20px" }}>
        XKAPS
      </footer>
    </div>
  );
}
