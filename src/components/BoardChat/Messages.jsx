import React, { Fragment } from "react";
import "./style.css";

const Messages = ({ message: { userName, text }, name }) => {
    let isSendByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();

    if (userName.toLowerCase() === trimmedName) {
        isSendByCurrentUser = true;
    }

    return (
        <Fragment>
            {isSendByCurrentUser ? (
                <Fragment>
                    <p className='message own-msg'>{text}</p>
                    <span>You</span>
                </Fragment>
            ) : (
                <Fragment>
                    <p className='message'>{text}</p>
                    <span>{userName}</span>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Messages;
