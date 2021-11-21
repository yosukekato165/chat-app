import React from "react";
import styled from "styled-components";
interface UserProps {
  // ユーザー名
  name: string;
}
const User = (props: UserProps) => {
  const { name } = props;
  return (
    <UserStyle>
      <div>{name}</div>
    </UserStyle>
  );
};
const UserStyle = styled.div`
  color: #ffffff;
  margin: 5px 0px;
`;
export default User;
