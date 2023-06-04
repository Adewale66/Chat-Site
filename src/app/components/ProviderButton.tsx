import { IconType } from "react-icons/lib";

export interface SocialButtonType {
  icon: IconType;
  onClick: () => void;
  provider: string;
}

const ProviderButton: React.FC<SocialButtonType> = ({
  icon: Icon,
  onClick,
  provider,
}) => {
  return (
    <div
      className="flex items-center gap-3 justify-center w-full bg-white shadow-md p-2 rounded-md hover:cursor-pointer"
      onClick={onClick}
    >
      <Icon />
      <span>{provider}</span>
    </div>
  );
};

export default ProviderButton;
