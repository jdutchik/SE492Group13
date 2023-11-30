import React from "react";

import './Account.css';

import person from '../Assets/user.png';

const Account = () => {
    const updateClicked = () => {
        window.location.href = '/Survey';
    };

    const signOutClicked = () => {
        window.location.href = '/';
    };

    return (
        <div className="accountContainer">
            <div className="quickInfo">
                <div className="picture">
                    <img src={person}></img>
                </div>
                <div className="name">Jane Doe</div>
                <div className="email">janedoe@iastate.edu</div>
                <div className="userButtons">
                    <div className="button" onClick={updateClicked}>Update</div>
                    <div className="button" onClick={signOutClicked}>Sign Out</div>
                </div>
            </div>

            <div className="accountInfo">
                <div className="info">
                    <div className="userInfo">Race: </div>
                    <div className="userInfo">Weight: </div>
                    <div className="userInfo">Geographical Info: </div>
                    <div className="userInfo">Diet: </div>
                </div>

                <div className="results">
                    You are allerigic to:
                    <div className="finalResult">EVERYTHING</div>
                </div>
            </div>
        </div>
    )
}

export default Account