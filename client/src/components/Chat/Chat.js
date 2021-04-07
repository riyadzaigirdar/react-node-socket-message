import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const Chat = () =>{
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const name = new URLSearchParams(window.location.search).get("name");
    const room = new URLSearchParams(window.location.search).get("room");
    
    useEffect(()=>{
        socket = io("localhost:5000", {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        })

        socket.emit("join",{name, room}, (error)=>{
            if(error){
                alert(error)
            }      
            return            
        }) 

        

        return ()=>{
            socket.disconnect()
        }
    }, [name, room])


    useEffect(()=>{
        socket.on("message", (item)=>{
            setMessages([...messages, item])
        })
    }, [messages])

    const sendMessage = ()=>{
        socket.emit("new_message", message, ()=>{
            console.log("server recieved message and deliver to client")
            setMessage("")
        })
    }

    console.log(messages)
    return (
        <div className="outerContainer">
            <div className="container">
                <input
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}                
                />
                <button onClick={sendMessage}>send</button>
            </div>
            {messages && messages.map((item, index)=>(<p key={index}> {item.user} : {item.text}</p>))}
        </div>
    )
}

export default Chat;