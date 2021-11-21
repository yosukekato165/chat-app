import React from "react";
import styled from "styled-components";
interface InputTextProps {
  // テキストが⼊⼒された場合のイベント
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  // テキストからフォーカスが外れた場合のイベント
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
  // プレースホルダー⽤
  placeholder: string;
}
const InputText = (props: InputTextProps) => {
  return (
    <InputTextStyle>
      <div
        contentEditable={true}
        onInput={props.onInput}
        onBlur={props.onBlur}
        className="text"
        data-placeholder={props.placeholder}
      ></div>
    </InputTextStyle>
  );
};
const InputTextStyle = styled.div`
  .text {
    border: 1px solid #dcdcdc;
    border-radius: 3px;
    padding: 10px;
    &:focus {
      border: 1px solid #d3d3d3;
    }
  }
  [data-placeholder]:empty:before {
    content: attr(data-placeholder);
    color: #888;
  }
`;
export default InputText;
