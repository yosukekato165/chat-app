import React, { useState } from "react";
import styled from "styled-components";
import ChatList, { ChatListData } from "../components/chat-list";
import Button from "../components/button";
import CreateChatRoomModal from "../components/create-chat-room-modal";
const data: ChatListData[] = [
  {
    roomId: "ROOM_1",
    name: "チャットルーム1",
    users: [],
  },
  {
    roomId: "ROOM_2",
    name: "チャットルーム2",
    users: [],
  },
  {
    roomId: "ROOM_3",
    name: "チャットルーム3",
    users: [],
  },
];

interface ChatListPageProps {}

const ChatListPage = (props: ChatListPageProps) => {
  const [isCreateChatRoomModalShow, setIsCreateChatRoomModalShow] = useState(
    false
  );

  return (
    <ChatListPageStyle>
      <div className="title">
        <div className="chatRoomList">チャットルーム⼀覧</div>
        <div>
          <Button
            name="チャットルームを作成"
            onClick={() => setIsCreateChatRoomModalShow(true)}
            primary
          />
        </div>
      </div>
      <ChatList data={data} />
      <CreateChatRoomModal
        onClickButton={() => setIsCreateChatRoomModalShow(false)}
        onBlurText={() => {}}
        onInputText={() => {}}
        isShow={isCreateChatRoomModalShow}
      />
    </ChatListPageStyle>
  );
};
const ChatListPageStyle = styled.div`
  padding: 20px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .chatRoomList {
    font-weight: bold;
    font-size: 20px;
  }
`;
export default ChatListPage;
