import { IconType } from "react-icons";

export interface Userprops {
  id: string;
  name: string;
  email: string;
  image: string;
  groupIds: string[];
  groups: GroupType[];
}

export interface GroupType {
  id: string;
  title: string;
  description: string;
  createdAt: String;
  admin: Userprops;
  members: Userprops[];
  messages: MessageProp[];
  message?: string;
}

export interface MessageProp {
  id: string;
  message: string;
  createdAt: string;
  user: Userprops;
}

export interface Props<T> {
  children: React.ReactNode;
  func: (data: T) => Promise<void>;
  data: T;
  clearData: () => void;
  invalidate: string;
  title: string;
}

export interface SocialButtonType {
  icon: IconType;
  onClick: () => void;
  provider: string;
}

export type buttonType = "LOGIN" | "REGISTER";
export interface inputs {
  name: string;
  email: string;
  password: string;
}
