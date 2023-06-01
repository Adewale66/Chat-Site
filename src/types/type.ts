import { IconType } from "react-icons/lib";

export type buttonType = "LOGIN" | "REGISTER";
export interface inputs {
  name: string;
  email: string;
  password: string;
}

export interface SocialButtonType {
  icon: IconType;
  onClick: () => void;
  provider: string;
}
