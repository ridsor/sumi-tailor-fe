export default function Loading() {
  return (
    <main
      className={`md:left-[250px] md:w-[calc(100%-250px)] left-[60px] w-[calc(100%-60px)] relative bg-three min-h-screen h-fit`}>
      <section className="pt-10">
        <div className="container max-w-full">
          <div className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-y-[30px]">
              <div className="lg;w-4/12 w-full">
                <div className="bg-[#bdc3c7] rounded-md w-[160px] h-[40px]"></div>
              </div>
              <div className="lg:w-8/12 w-full">
                <div className="flex gap-x-3 justify-around">
                  <div className="bg-[#bdc3c7] rounded-md w-[300px] h-[80px]"></div>
                  <div className="bg-[#bdc3c7] rounded-md w-[300px] h-[80px]"></div>
                </div>
              </div>
            </div>
            <div className="flex gap-x-[80px] mt-9 flex-wrap gap-y-[40px] justify-center">
              <div className="bg-[#bdc3c7] rounded-md w-full md:w-[400px] lg:w-[calc(50%-40px)]  h-[200px] lg:h-[250px]"></div>
              <div className="bg-[#bdc3c7] rounded-md w-full md:w-[400px] lg:w-[calc(50%-40px)] h-[200px] lg:h-[250px]"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
