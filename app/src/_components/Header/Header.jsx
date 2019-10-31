import React, { useState } from 'react';

import Button from '../Button/Button';
import leaveRoomIcon from "../../images/leaveRoom-orange.png";

import logoImg from "../../images/Logo.png";

import './Header.scss';

const Header = ({ roomId, userName, leaveRoom }) => {
    const [showNav, setShowNav] = useState(false);
    
 const shareRoom = () => {
     console.log("in it");
     console.log(navigator);
     alert();
   if (navigator.share) {
     alert("in it");
     navigator
       .share({
         title: "Free Planning Poker",
         text: "Join My Room!",
         url: window.location.href
       })
       .then(() => alert("Successful share"))
       .catch(error => alert("Error sharing", error));
   }
 };

 const leaveTheRoom = () =>{
     leaveRoom();
     setShowNav(false);
     console.log("leavehteroom")
 } 
    
  return (
    <header id="header">
      <div className="top-header row">
        <img
          className="logoImg col-xs-8 col-xs-offset-2"
          alt="Logo image"
          src={logoImg}
        />
      </div>
      <div className="sub-header row">
        <div className="col-xs-3">
          <Button className="pill username">{userName}</Button>
        </div>
        <div className="col-xs-6">
          <div className="row center-header">
            <div className="col-xs-2">
              <Button className="icon" onClick={leaveTheRoom}>
                <img alt="Leave Room" src={leaveRoomIcon} />
              </Button>
            </div>
            <div className="col-xs-8">
              <Button className="pill roomid">{roomId}</Button>
            </div>
            <div className="col-xs-2">
              <Button className="icon" onClick={shareRoom}>
                <img
                  alt="Share Room"
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2YxYzQwZiI+PHBhdGggZD0iTTEyOSwxNC4zMzMzM2MtMTEuODc0MTIsMCAtMjEuNSw5LjYyNTg4IC0yMS41LDIxLjVjMC4wMDQzOCwxLjM0ODQxIDAuMTM1NiwyLjY5MzQyIDAuMzkxOTMsNC4wMTcyNWwtNTAuOTkyNTIsMjkuNzQ0NDdjLTMuODgzOTIsLTMuMjkwMTcgLTguODA5MjIsLTUuMDk1NjEgLTEzLjg5OTQxLC01LjA5NTA1Yy0xMS44NzQxMiwwIC0yMS41LDkuNjI1ODggLTIxLjUsMjEuNWMwLDExLjg3NDEyIDkuNjI1ODgsMjEuNSAyMS41LDIxLjVjNS4wODIzMywtMC4wMDk5NyA5Ljk5NjgxLC0xLjgyMDA1IDEzLjg3MTQyLC01LjEwOTA1bDUxLjAyMDUxLDI5Ljc1ODQ3Yy0wLjI1NjMzLDEuMzIzODMgLTAuMzg3NTUsMi42Njg4NCAtMC4zOTE5Myw0LjAxNzI1YzAsMTEuODc0MTIgOS42MjU4OCwyMS41IDIxLjUsMjEuNWMxMS44NzQxMiwwIDIxLjUsLTkuNjI1ODggMjEuNSwtMjEuNWMwLC0xMS44NzQxMiAtOS42MjU4OCwtMjEuNSAtMjEuNSwtMjEuNWMtNS4wODcxNCwwLjAwNjY2IC0xMC4wMDcxMywxLjgxNjk0IC0xMy44ODU0Miw1LjEwOTA1bC01MS4wMDY1MSwtMjkuNzU4NDdjMC4yNTYzMywtMS4zMjM4MyAwLjM4NzU1LC0yLjY2ODg0IDAuMzkxOTMsLTQuMDE3MjVjLTAuMDA0MzgsLTEuMzQ4NDEgLTAuMTM1NiwtMi42OTM0MiAtMC4zOTE5MywtNC4wMTcyNWw1MC45OTI1MSwtMjkuNzQ0NDdjMy44ODM5MiwzLjI5MDE3IDguODA5MjIsNS4wOTU2MSAxMy44OTk0MSw1LjA5NTA1YzExLjg3NDEyLDAgMjEuNSwtOS42MjU4OCAyMS41LC0yMS41YzAsLTExLjg3NDEyIC05LjYyNTg4LC0yMS41IC0yMS41LC0yMS41eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                />
              </Button>
            </div>
          </div>
        </div>
        <div className="col-xs-3">
          <Button
            className={`hamburger hamburger--arrowalt js-hamburger ${showNav &&
              "is-active"}`}
            onClick={() => setShowNav(!showNav)}
          >
            <div className="hamburger-box">
              <div className="hamburger-inner"></div>
            </div>
          </Button>
          <div className={`nav ${showNav && "active"}`}>
            <ul className="">
              <li className="col-xs-12" onClick={leaveTheRoom}>
                Leave Room
              </li>
              <li className="col-xs-12" onClick={shareRoom}>
                Share Room
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
