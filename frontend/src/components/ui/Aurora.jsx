import React from "react";

export default function Aurora() {
  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute h-[50rem] w-[50rem] -translate-x-[10%] -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-500/40 to-fuchsia-500/40 blur-3xl" />
        <div className="absolute right-0 h-[50rem] w-[50rem] translate-x-[10%] translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/40 to-indigo-500/40 blur-3xl" />
        <div className="absolute bottom-0 h-[50rem] w-[50rem] -translate-x-1/2 translate-y-1/4 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 blur-3xl" />
      </div>
    </div>
  );
} 