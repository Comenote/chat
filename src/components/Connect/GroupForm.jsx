import React, { useState } from "react";
import axios from "axios";
import "./groupForm.css";

const GroupForm = ({ onLogin }) => {
    const [room, setRoom] = useState("");
    const [userName, setUserName] = useState("");
    const [isLoading, setLoading] = useState(false);

    const onEnter = async () => {
        if (!room || !userName) {
            alert(`Enter the data`);
        }
        setLoading(true);
        const obj = {
            room,
            userName,
        };
        await axios.post("/rooms", obj);
        onLogin(obj);
    };

    return (
        <div
            className='d-flex flex-column align-center mt-5 col-4'
            value={room}>
            <input
                className='inputStyle'
                type='text'
                placeholder='Room ID'
                value={room}
                onChange={(e) => setRoom(e.target.value)}
            />
            <input
                className='inputStyle mt-3'
                type='text'
                placeholder='User name'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button
                onClick={onEnter}
                disabled={isLoading}
                type='button'
                className='btn btn-dark mt-3 buttonStyle'>
                {isLoading ? "Connecting" : "Connect"}
            </button>
        </div>
    );
};

export default GroupForm;
