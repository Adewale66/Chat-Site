import { SocialButtonType } from "@/types/type";

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
