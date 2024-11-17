import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center flex-col justify-center  size-full h-screen gap-3 text-white">
      <Image
        src="/icons/loader.svg"
        alt="loader"
        width={40}
        height={3240}
        className="animate-spin"
      />
      Loading...
    </div>
  );
}
