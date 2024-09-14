import Dashboard from "@/components/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KAPS",
  description:
    "A multi-chain and fully on-chain decentralized messaging application",
};

export default function Home() {
  return (
    <>
      <Dashboard />
    </>
  );
}
