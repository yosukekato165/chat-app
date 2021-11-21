import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "./button";
interface ChatListItemProps {
  // チャットルーム名
  name: string;
  // チャットルームの⼈数
  numberOfPeople: number;
  // チャットルームID
  roomId: string;
}
// const ChatListItem extends React.Component<ChatListItemProps> {
const ChatListItem = (props: ChatListItemProps) => {
  /*
   * ⼊室ボタンクリック時の処理
   */
  const HandlePage = () => {
    // チャットルームページに遷移
    let navigate = useNavigate();
    navigate("/room?roomId=" + props.roomId);
  };

  return (
    <ChatListItemStyle>
      <div className="chatRoomName">{props.name}</div>
      <div className="numberOfPeople">{props.numberOfPeople} ⼈</div>
      <div className="button">
        <Button name="⼊室" onClick={() => HandlePage()} primary />
      </div>
    </ChatListItemStyle>
  );
};
const ChatListItemStyle = styled.div`
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid #d3d3d3;
  padding-top: 10px;
  padding-bottom: 10px;
  &:hover {
    background: #f5f5f5;
  }
  .chatRoomName {
    width: calc(100% - 200px);
    padding-left: 10px;
  }
  .numberOfPeople {
    width: 100px;
    text-align: right;
  }
  .button {
    width: 100px;
    text-align: right;
  }
`;
// ⼦コンポーネントでHistory API を使いたいのでwithRouter を使⽤
export default ChatListItem;
