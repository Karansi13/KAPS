import React from "react";

interface NavItems {
  label: string;
  page: string;
}

export const navLinks: NavItems[] = [
  {
    label: "Home",
    page: "/",
  },
  {
    label: "Users",
    page: "users",
  },
  {
    label: "Chat",
    page: "chat",
  },
  {
    label: "About",
    page: "about",
  },
];
