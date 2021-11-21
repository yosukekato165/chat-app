import React from "react";
import styled from "styled-components";
import InputText from "./input-text";
import Button from "./button";
interface CreateMessageProps {
  // メッセージが⼊⼒された場合のイベント
  onInputText: (e: React.FormEvent<HTMLDivElement>) => void;
  // メッセージ⼊⼒欄からフォーカスが外れた場合のイベント
  onBlurText: (e: React.FormEvent<HTMLDivElement>) => void;
  // 投稿ボタンがクリックされた場合のイベント
  onClickButton: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const CreateMessage = (props: CreateMessageProps) => {
  const { onInputText, onBlurText, onClickButton } = props;
  return (
    <CreateMessageStyle>
      <div className="input">
        <InputText
          placeholder="メッセージ"
          onInput={onInputText}
          onBlur={onBlurText}
        />
      </div>
      <div className="button">
        <Button name="投稿" onClick={onClickButton} primary />
      </div>
    </CreateMessageStyle>
  );
};
const CreateMessageStyle = styled.div`
  display: grid;
  grid-template-rows: 80px;
  grid-template-columns: 1fr 80px;
  align-items: center;
  .input {
    padding: 10px;
  }
`;
export default CreateMessage;
