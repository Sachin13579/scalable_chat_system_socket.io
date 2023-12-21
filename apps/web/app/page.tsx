'use client'

import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";

export default function Page() {
  const { sendMessage, message } = useSocket();
  const [messages, setMessages] = useState("");
  return (
    <div>
      <h1>All mesages wil apear here</h1>
      <div>
        <input onChange={e => setMessages(e.target.value)} className={classes["chat-input"]} type="text" placeholder="type messages...." />
        <button onClick={e => sendMessage(messages)} className={classes["button"]}>Send</button>
      </div>
      <div >
        {message.map((e, index) => (
          <li key={index + 1} >{e}</li>

        )

        )}
      </div>
    </div>
  )
}