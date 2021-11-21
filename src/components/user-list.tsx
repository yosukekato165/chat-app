import React from "react";
import User from "./user";
export interface UserItem {
  // ユーザー名
  name: string;
  // ソケットID
  socketId: string;
}
interface UserListProps {
  users: UserItem[];
}
const UserList = (props: UserListProps) => {
  const { users } = props;
  return (
    <div>
      {users &&
        users.map((item: UserItem) => {
          return <User name={item.name} key={item.socketId} />;
        })}
    </div>
  );
};
export default UserList;
