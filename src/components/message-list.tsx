import React from "react";
import styled from "styled-components";
import Message from "./message";
export interface MessageItem {
  // 履歴ID
  logId: number;
  // ユーザー名
  userName: string;
  // 投稿⽇時
  time: string;
  // メッセージ
  message: string;
}
interface MessageListProps {
  messages: MessageItem[];
}
const MessageList = (props: MessageListProps) => {
  return (
    <MessageListStyle>
      {props.messages &&
        props.messages.map((item: MessageItem) => {
          return (
            <Message
              userName={item.userName}
              time={item.time}
              message={item.message}
              key={item.logId}
            />
          );
        })}
    </MessageListStyle>
  );
};
const MessageListStyle = styled.div`
  position: absolute;
  bottom: 0;
`;
export default MessageList;
