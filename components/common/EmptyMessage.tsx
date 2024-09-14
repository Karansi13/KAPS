import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import ChatDapp from "@/public/assets/XKAPS.png";
import Image from "next/image";

const EmptyMessage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="my-10">
        <Heading size="sm">
          Welcome to
        </Heading>
      </div>
      <Image
        src={ChatDapp}
        alt="image"
        className="rounded-full"
        height={500}
        width={500}
      />
      <div className="rounded-md flex flex-col ">
        <div className="border rounded-lg border-slate-600 p-3 bg-white mt-3">
          <Paragraph className="text-slate-500">Happy Chatting!</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default EmptyMessage;