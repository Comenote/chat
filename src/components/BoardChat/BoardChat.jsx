import React, { Fragment, useState, useRef, useEffect } from "react";
import socket from "../../socket";
import Messages from "./Messages";
import "./style.css";

const BoardChat = ({ users, messages, userName, room, onAddMessage }) => {
    const [message, setMessageValue] = useState("");
    const messagesRef = useRef(null);
    const onSendMessage = () => {
        socket.emit("ROOM:NEW_MESSAGE", {
            userName,
            room,
            text: message,
        });
        onAddMessage({ userName, text: message });
        setMessageValue("");
    };
    useEffect(() => {
        messagesRef.current.scrollTo(0, 99999); // scroll is going down to the newest message
    }, [messages]);
    return (
        <div className='row g-0 board-settings'>
            <div className='col-4 sideBar paddings'>
                <p>Room: {room}</p>
                <p className='online'>Online: ({users.length})</p>
                <ul>
                    {users.map((name, key) => {
                        return <li key={key}>{name}</li>;
                    })}
                </ul>
            </div>
            <div className='col-8 row g-0 h-100'>
                <div
                    ref={messagesRef}
                    className='col-12 chat-settings paddings'>
                    {messages.map((message, i) => (
                        <Fragment key={i}>
                            <Messages message={message} name={userName} />
                        </Fragment>
                    ))}
                </div>
                <div className='col form-settings paddings'>
                    <form className='form w-90'>
                        <textarea
                            value={message}
                            onChange={(e) => setMessageValue(e.target.value)}
                            name='message'
                            rows='1'
                            className='input'
                            placeholder='Write a message...'
                        />
                        <Fragment>
                            {message ? (
                                <button
                                    onClick={onSendMessage}
                                    type='button'
                                    className='btn btn-dark btn-custom'
                                />
                            ) : null}
                        </Fragment>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BoardChat;
