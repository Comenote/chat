import React, { useReducer, useEffect } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import reducer from "./reducer";
import socket from "./socket";
import GroupForm from "./components/Connect/GroupForm";
import BoardChat from "./components/BoardChat/BoardChat";
// import Waves from "./components/Waves/Waves";

function App() {
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        room: null,
        userName: null,
        users: [],
        messages: [],
    });

    const onLogin = async (obj) => {
        dispatch({
            type: "JOINED",
            payload: obj,
        });
        socket.emit("ROOM:JOIN", obj);
        const { data } = await axios.get(`/rooms/${obj.room}`);
        dispatch({
            type: "SET_DATA",
            payload: data,
        });
    };

    // console.log(state);

    const setUsers = (users) => {
        dispatch({
            type: "SET_USERS",
            payload: users,
        });
    };

    const addMessage = (message) => {
        dispatch({
            type: "NEW_MESSAGE",
            payload: message,
        });
    };

    useEffect(() => {
        socket.on("ROOM:SET_USERS", setUsers);
        socket.on("ROOM:NEW_MESSAGE", addMessage);
    }, []);

    // window.socket = socket;

    return (
        <div className='container d-flex justify-content-center app'>
            {!state.joined ? (
                <GroupForm onLogin={onLogin} />
            ) : (
                <BoardChat {...state} onAddMessage={addMessage} />
            )}
            {/* <BoardChat {...state} /> */}
            {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit eos aspernatur harum cumque doloremque possimus id itaque. Quod nemo rem voluptate, cupiditate laborum eveniet dicta modi non veritatis et fugiat! */}
        </div>
    );
}

export default App;
