import React from "react";
import ChatListItem from "./chat-list-item";
import { Room } from "../types/store";
interface ChatListProps {
  data: Room[];
}
const ChatList = (props: ChatListProps) => {
  return (
    <div>
      {props.data &&
        props.data.map((item: Room) => {
          return (
            <ChatListItem
              name={item.name}
              numberOfPeople={item.users.length}
              roomId={item.id}
              key={item.id}
            />
          );
        })}
    </div>
  );
};
export default ChatList;
