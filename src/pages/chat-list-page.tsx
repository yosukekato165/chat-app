import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ChatList from "../components/chat-list";
import Button from "../components/button";
import CreateChatRoomModal from "../components/create-chat-room-modal";
import { ApplicationState } from "../store";
import { getRoomsList, connectWebSocket, createRoom } from "../store/actions";
import { Room } from "../types/store";
interface ChatListPageProps {
  // チャットルーム⼀覧
  rooms: Room[];
  // チャットルーム⼀覧取得
  getRoomsList: typeof getRoomsList;
  // WebSocketへの接続
  connectWebSocket: typeof connectWebSocket;
  // チャットルーム作成
  createRoom: typeof createRoom;
}

const ChatListPage = (props: ChatListPageProps) => {
  const [isCreateChatRoomModalShow, setIsCreateChatRoomModalShow] = useState(
    false
  );
  const [chatRoomName, setChatRoomName] = useState("");

  /**
   * コンポーネントがマウントされた際の処理
   */
  useEffect(() => {
    // WebSocketへの接続
    props.connectWebSocket();
    setTimeout(() => {
      // チャットルーム⼀覧の取得
      props.getRoomsList();
    }, 1000);
  }, [props]);
  /**
   * チャットルーム作成モーダル表⽰処理
   */
  const displayCreateChatroomModal = (): void => {
    setIsCreateChatRoomModalShow(true);
  };
  /**
   * チャットルーム作成処理
   */
  const createChatRoom = (): void => {
    // チャットルーム名が⼊⼒されている場合
    if (chatRoomName) {
      props.createRoom({
        roomName: chatRoomName,
      });
      setIsCreateChatRoomModalShow(false);
    }
  };
  /**
   * チャットルーム名取得処理
   *
   * @param e フォームイベント
   */
  const getChatRoomName = (e: React.FormEvent<HTMLDivElement>): void => {
    // チャットルーム名⼊⼒欄に⼊⼒した内容を取得し、ステートに設定
    const text: string | null = e.currentTarget.textContent;
    setChatRoomName(text ? text : "");
  };

  /**
   * チャットルーム名クリア処理
   *
   * @param e フォームイベント
   */
  const clearChatRoomName = (e: React.FormEvent<HTMLDivElement>): void => {
    // チャットルーム名⼊⼒欄からフォーカスアウトした場合に
    // ⼊⼒欄に⼊⼒した内容をクリアする
    e.currentTarget.textContent = "";
  };
  return (
    <ChatListPageStyle>
      <div className="title">
        <div className="chatRoomList">チャットルーム⼀覧</div>
        <div>
          <Button
            name="チャットルームを作成"
            onClick={() => displayCreateChatroomModal()}
            primary
          />
        </div>
      </div>
      <ChatList data={props.rooms} />
      <CreateChatRoomModal
        onClickButton={() => createChatRoom()}
        onBlurText={(e) => clearChatRoomName(e)}
        onInputText={(e) => getChatRoomName(e)}
        isShow={isCreateChatRoomModalShow}
      />
    </ChatListPageStyle>
  );
};
const mapStateToProps = ({ app }: ApplicationState) => ({
  rooms: app.rooms,
});
const mapDispatchToProps = {
  getRoomsList,
  connectWebSocket,
  createRoom,
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
export default connect(mapStateToProps, mapDispatchToProps)(ChatListPage);
