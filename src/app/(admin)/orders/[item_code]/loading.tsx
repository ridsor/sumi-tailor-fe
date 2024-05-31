export default function loading() {
  return (
    <main>
      <section>
        <div className="container animate-pulse border-4 h-screen flex flex-col max-h-[1080px] min-h-[508px]">
          <div className="flex justify-between mx-4 my-2 items-center">
            <div className="rounded-md h-[30px] bg-[#bdc3c7] w-[180px]" />
            <div className="rounded-md h-[44px] bg-[#bdc3c7] w-[44px]" />
          </div>
          <div className="border-five border-b"></div>
          <div className="px-4">
            <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px] my-2" />
            <div className="border-five border-b"></div>
            <div className="flex justify-between gap-2">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px] my-2" />
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px] my-2" />
            </div>
            <div className="flex justify-between gap-2">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px] mb-2" />
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px] mb-2" />
            </div>
            <div className="flex justify-between gap-2">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px] mb-2" />
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px] mb-2" />
            </div>
            <div className="flex justify-between gap-2">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px] mb-2" />
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px] mb-2" />
            </div>
          </div>
          <div className="p-4 border-t-8 flex-1 flex flex-col">
            <div className="lightbox-image min-w-[150px] w-[150px] h-[150px] relative z-20 overflow-hidden rounded-sm mb-3 bg-[#bdc3c7]"></div>
            <div className="border border-five px-3 py-2 rounded-md flex-1 flex flex-col">
              <div className=" rounded-md  mb-2 h-full w-full">
                <div className=" rounded-md h-[20px] bg-[#bdc3c7] w-[100px] mb-2" />
                <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px] mb-2" />
              </div>
              <div className="border-five border-b"></div>
              <div className=" rounded-md h-[20px] bg-[#bdc3c7] w-[100px] my-2" />
              <div className=" rounded-md h-[20px] bg-[#bdc3c7] w-[100px]" />
            </div>
            <div className=" rounded-md h-[40px] bg-[#bdc3c7] w-[160px] mx-auto mt-5" />
          </div>
        </div>
      </section>
    </main>
  );
}
