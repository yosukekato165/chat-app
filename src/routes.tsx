import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Global } from "@emotion/react";

import ChatListPage from "./pages/chat-list-page";
import ChatRoomPage from "./pages/chat-room-page";
import global from "./styles/global";

const Router = () => {
  return (
    <BrowserRouter>
      <Global styles={global} />
      <Routes>
        <Route path="/" element={<ChatListPage />} />
        <Route path="/room" element={<ChatRoomPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
