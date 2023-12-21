'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
    children?: React.ReactNode;
}
interface ISocketContext {
    sendMessage: (msg: string) => any;
    message: string[]
}
const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error(`state is undefined`);
    return state;
}
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket>()
    const [message, setMessage] = useState<string[]>([])
    const sendMessage: ISocketContext['sendMessage'] = useCallback((message) => {
        console.log("message is ", message)
        if (socket) {
            socket.emit("event:message", { message: message })
        }
    }, [socket]);

    const onMessageReceived = useCallback((message: string) => {
        console.log("From server message received", message)
        const parsedMessage = JSON.parse(message) as { message: string }
        // const { messages } = JSON.parse(message) as { messages: string }
        console.log(parsedMessage.message, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        setMessage(prev => [...prev, parsedMessage.message])
    }, [])

    useEffect(() => {

        const _socket = io('http://localhost:8000');
        _socket.on('message', onMessageReceived)
        setSocket(_socket)
        return () => {
            _socket.off('message', onMessageReceived)
            _socket.disconnect();
            setSocket(undefined)
        }
    }, [])
    return (
        < SocketContext.Provider value={{ sendMessage, message }} >
            {children}
        </SocketContext.Provider >
    )

}