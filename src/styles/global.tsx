import { css } from "@emotion/react";
const globals = css`
  html,
  body {
    font-size: 15px;
    width: 100%;
    height: 100%;
    font-family: sans-serif;
    /* 下に⾏ったときにバウンドしないようにする*/
    overscroll-behavior: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  *:focus {
    outline: none;
  }
`;
export default globals;
