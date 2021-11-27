import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserList, { UserItem } from "../components/user-list";
import Button from "../components/button";
import MessageList, { MessageItem } from "../components/message-list";
import JoinChatRoom from "../components/join-chat-room";
import CreateMessage from "../components/create-message";
import { ApplicationState } from "../store";
import {
  getCurrentRoom,
  connectWebSocket,
  joinRoom,
  sendMessage,
  clearCurrentRoom,
  setCurrentRoomId,
  leaveRoom,
} from "../store/actions";

interface ChatRoomPageProps {
  // 現在のチャットルームID
  currentRoomId: string;
  // 現在のチャットルーム名
  currentRoomName: string;
  // 現在のチャットルームのユーザー⼀覧
  currentRoomUsers: UserItem[];
  // 現在のチャットルームのメッセージ⼀覧
  currentRoomLogs: MessageItem[];
  // WebSocketへの接続
  connectWebSocket: typeof connectWebSocket;
  // 現在のチャットルームの情報取得
  getCurrentRoom: typeof getCurrentRoom;
  // チャットルームへの⼊室
  joinRoom: typeof joinRoom;
  // メッセージの送信
  sendMessage: typeof sendMessage;
  // 現在のチャットルーム情報のクリア
  clearCurrentRoom: typeof clearCurrentRoom;
  // 現在のチャットルームID設定
  setCurrentRoomId: typeof setCurrentRoomId;
  // チャットルーム退室
  leaveRoom: typeof leaveRoom;
}

interface ChatRoomPageProps {}

const ChatRoomPage = (props: ChatRoomPageProps) => {
  const [isJoin, setIsJoin] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState("");
  const [text, setText] = useState("");
  const [userName, setUsername] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (!currentRoomId) {
      // 現在のチャットルームIDが未設定の場合はチャットルーム⼀覧に戻る
      navigate("/");
    } else {
      // 現在のチャットルームIDが存在する場合は保存
      props.setCurrentRoomId(currentRoomId);
    }
    // WebSocketへの接続
    props.connectWebSocket();
    setTimeout(() => {
      // 現在のチャットルームの情報取得
      getCurrentRoomInfo();
    }, 1000);
  });

  /**
   * 現在のチャットルーム情報取得処理
   */
  const getCurrentRoomInfo = (): void => {
    props.getCurrentRoom({
      roomId: currentRoomId,
    });
  };
  /**
   * 現在のチャットルームIDの取得
   */
  const getCurrentRoomId = (): string => {
    const parameters: string = window.location.search;
    // パラメーターの内、「roomId」を取得
    const roomIdParam: string[] = parameters
      .split("&")
      .filter((p) => p.indexOf("roomId") > 0);
    // パラメーターが存在する場合はその値を取得
    if (roomIdParam.length === 1) {
      const roomId = roomIdParam[0].split("=")[1];
      return roomId;
    }
    return "";
  };
  /**
   * ⼊室ボタンクリック時の処理
   */
  const onClickJoin = (): void => {
    if (text) {
      props.joinRoom({
        roomId: currentRoomId,
        userName: text,
      });

      setIsJoin(true);
      setUsername(text);
      setText("");
    }
  };
  /**
   * 投稿ボタンクリック時の処理
   */
  const onClickSending = (): void => {
    if (text) {
      props.sendMessage({
        roomId: currentRoomId,
        userName: userName,
        message: text,
      });
      setText("");
    }
  };
  /**
   * ⼊⼒欄に⼊⼒時の処理
   *
   * @param e フォームイベント
   */
  const onInputText = (e: React.FormEvent<HTMLDivElement>): void => {
    const text: string | null = e.currentTarget.textContent;
    setText(text ? text : "");
  };
  /**
   * ⼊⼒欄からフォーカスアウト時の処理
   *
   * @param e フォームイベント
   */
  const onBlurText = (e: React.FormEvent<HTMLDivElement>): void => {
    e.currentTarget.textContent = "";
  };
  /**
   * 戻るボタンクリック時の処理
   */
  const backToRoomList = (): void => {
    // 現在のチャットルーム情報のクリア
    props.clearCurrentRoom();
    // チャットルーム退室
    props.leaveRoom();
    // チャットルーム⼀覧ページに遷移
    navigate("/");
  };

  return (
    <ChatRoomPageStyle isJoin={isJoin}>
      <div className="menu">
        <div className="chatRoomName">{props.currentRoomName}</div>
        <div className="userList">
          <UserList users={props.currentRoomUsers} />
        </div>
        <div className="button">
          <Button name="戻る" onClick={() => backToRoomList()} />
        </div>
      </div>
      <div className="message">
        <MessageList messages={props.currentRoomLogs} />
      </div>
      <div className="createMessage">
        <div className="notJoin">
          <JoinChatRoom
            onInputText={(e) => onInputText(e)}
            onBlurText={(e) => onBlurText(e)}
            onClickButton={() => onClickJoin()}
          />
        </div>
        <div className="join">
          <CreateMessage
            onInputText={(e) => onInputText(e)}
            onBlurText={(e) => onBlurText(e)}
            onClickButton={() => onClickSending()}
          />
        </div>
      </div>
    </ChatRoomPageStyle>
  );
};

const mapStateToProps = ({ app }: ApplicationState) => ({
  currentRoomId: app.currentRoom.id,
  currentRoomName: app.currentRoom.name,
  currentRoomUsers: app.currentRoom.users,
  currentRoomLogs: app.currentRoom.logs,
});
const mapDispatchToProps = {
  getCurrentRoom,
  connectWebSocket,
  joinRoom,
  sendMessage,
  clearCurrentRoom,
  setCurrentRoomId,
  leaveRoom,
};

const ChatRoomPageStyle = styled.div<{ isJoin: boolean }>`
  display: grid;
  grid-template-rows: 1fr 80px;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
  box-sizing: border-box;
  .menu {
    background: #27224d;
    grid-row: /3;
    grid-column: /2;
    display: grid;
    grid-template-rows: 80px 1fr 80px;
    grid-template-columns: 250px;
    .chatRoomName {
      font-size: 20px;
      color: #ffffff;
      font-weight: bold;
      grid-row: /2;
      grid-column: /2;
      padding: 10px;
    }
    .userList {
      grid-row: /3;
      grid-column: /2;
      padding: 10px;
    }
    .button {
      grid-row: /4;
      grid-column: /2;
      text-align: center;
    }
  }
  > .message {
    grid-row: /2;
    grid-column: /3;
    position: relative;
    padding: 10px;
  }
  .createMessage {
    border-top: 1px solid #d3d3d3;
    grid-row: /3;
    grid-column: /3;
    .notJoin {
      display: ${(props) => (!props.isJoin ? "block" : "none")};
    }
    .join {
      display: ${(props) => (props.isJoin ? "block" : "none")};
    }
  }
`;
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomPage);
