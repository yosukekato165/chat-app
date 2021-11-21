import React from "react";
import styled from "styled-components";
import InputText from "./input-text";
import Button from "./button";
interface CreateChatRoomModalProps {
  // チャットルーム名が⼊⼒された場合のイベント
  onInputText: (e: React.FormEvent<HTMLDivElement>) => void;
  // チャットルーム名⼊⼒欄からフォーカスが外れた場合のイベント
  onBlurText: (e: React.FormEvent<HTMLDivElement>) => void;
  // 作成ボタンがクリックされた場合のイベント
  onClickButton: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  // モーダルの表⽰∕⾮表⽰の切り替え⽤フラグ
  isShow: boolean;
}

const CreateChatRoomModal = (props: CreateChatRoomModalProps) => {
  return (
    <CreateChatRoomModalStyle isShow={props.isShow}>
      <div className="modal">
        <div>
          <InputText
            placeholder="チャットルーム名"
            onInput={props.onInputText}
            onBlur={props.onBlurText}
          />
        </div>
        <div className="button">
          <Button name="作成" onClick={props.onClickButton} primary />
        </div>
      </div>
    </CreateChatRoomModalStyle>
  );
};
const CreateChatRoomModalStyle = styled.div<{ isShow: boolean }>`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.3);
  /* モーダルの表⽰∕⾮表⽰の切り替え*/
  display: ${(props) => (props.isShow ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  .modal {
    opacity: initial;
    background: rgba(255, 255, 255, 1);
    width: 500px;
    padding: 20px;
  }
  .button {
    margin-top: 10px;
    text-align: right;
  }
`;
export default CreateChatRoomModal;
