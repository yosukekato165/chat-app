import React from "react";
import styled from "styled-components";
import InputText from "./input-text";
import Button from "./button";

interface JoinChatRoomProps {
  // ユーザー名が⼊⼒された場合のイベント
  onInputText: (e: React.FormEvent<HTMLDivElement>) => void;
  // ユーザー名⼊⼒欄からフォーカスが外れた場合のイベント
  onBlurText: (e: React.FormEvent<HTMLDivElement>) => void;
  // ⼊室ボタンがクリックされた場合のイベント
  onClickButton: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const JoinChatRoom = (props: JoinChatRoomProps) => {
  const { onInputText, onBlurText, onClickButton } = props;
  return (
    <JoinChatRoomStyle>
      <div className="input">
        <InputText
          placeholder="ユーザー名"
          onInput={onInputText}
          onBlur={onBlurText}
        />
      </div>
      <div className="button">
        <Button name="⼊室" onClick={onClickButton} primary />
      </div>
    </JoinChatRoomStyle>
  );
};

const JoinChatRoomStyle = styled.div`
  display: grid;
  grid-template-rows: 80px;
  grid-template-columns: 1fr 80px;
  align-items: center;
  .input {
    padding: 10px;
  }
`;
export default JoinChatRoom;
