export default function OrdersLoading() {
  return (
    <>
      <div className="flex justify-between  mb-7 w-fit gap-3 animate-pulse">
        <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[71px]  " />
        <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[71px]" />
      </div>
      <div className="orders flex flex-col gap-6 w-full pb-10 p-1">
        <div className="columns-[350px] lg:columns-2 gap-3">
          <div className="bg-[#bdc3c7] h-[86px] rounded-md mb-3"></div>
          <div className="bg-[#bdc3c7] h-[86px] rounded-md mb-3"></div>
          <div className="bg-[#bdc3c7] h-[86px] rounded-md mb-3"></div>
          <div className="bg-[#bdc3c7] h-[86px] rounded-md mb-3"></div>
          <div className="bg-[#bdc3c7] h-[86px] rounded-md mb-3"></div>
          <div className="bg-[#bdc3c7] h-[86px] rounded-md mb-3"></div>
          <div className="bg-[#bdc3c7] h-[86px] rounded-md mb-3"></div>
          <div className="bg-[#bdc3c7] h-[86px] rounded-md mb-3"></div>
        </div>
        <div className="flex justify-center gap-4">
          <div className="w-[36px] aspect-square rounded-full bg-[#bdc3c7]"></div>
          <div className="w-[36px] aspect-square rounded-full bg-[#bdc3c7]"></div>
          <div className="w-[36px] aspect-square rounded-full bg-[#bdc3c7]"></div>
          <div className="w-[36px] aspect-square rounded-full bg-[#bdc3c7]"></div>
          <div className="w-[36px] aspect-square rounded-full bg-[#bdc3c7]"></div>
          <div className="w-[36px] aspect-square rounded-full bg-[#bdc3c7]"></div>
          <div className="w-[36px] aspect-square rounded-full bg-[#bdc3c7]"></div>
          <div className="w-[36px] aspect-square rounded-full bg-[#bdc3c7]"></div>
        </div>
      </div>
    </>
  );
}
