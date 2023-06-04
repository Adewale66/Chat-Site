import Body from "../components/body/Body";
import BodyLayout from "../components/body/BodyLayout";
import InputMessage from "../components/body/InputMessage";
import Content from "../components/body/Content";

const Page = () => {
  return (
    <div className="w-full max-[765px]:absolute flex ">
      <BodyLayout>
        <Body />
        <InputMessage />
      </BodyLayout>
      <Content />
    </div>
  );
};

export default Page;
