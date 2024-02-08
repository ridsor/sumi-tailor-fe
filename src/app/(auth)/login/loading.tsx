export default function loading() {
  return (
    <>
      <section className="pt-24 md:pb-4 bg-three">
        <div className="container max-w-full">
          <div className="min-h-[500px] flex flex-wrap justify-center">
            <article className="w-full lg:w-[calc(100%-500px)] ">
              <div className="flex items-center w-full h-full">
                <div className="bg-[#E4EEDD] h-full w-full md:rounded-tr-xl md:rounded-br-xl md:shadow-sm flex justify-center items-center">
                  <div className="p-4 w-full md:w-auto">
                    <div className="w-[300px] h-[300px] mb-6 bg-[#bdc3c7] rounded-md hidden lg:block"></div>
                    <div className="bg-[#bdc3c7] rounded-md w-full md:w-[460px] md:mx-auto lg:mx-0 h-[42px]"></div>
                  </div>
                </div>
              </div>
            </article>
            <article className="w-full md:w-[500px]">
              <div className="flex justify-center items-center p-8 h-full">
                <div className="w-full">
                  <div className="mb-4 bg-[#bdc3c7] rounded-md w-[100px] h-[36px]"></div>
                  <div className="mb-6 bg-[#bdc3c7] rounded-md w-full h-[42px]"></div>
                  <div>
                    <div className="bg-[#bdc3c7] rounded-md w-full h-[40px] mb-4"></div>
                    <div className="bg-[#bdc3c7] rounded-md w-full h-[40px] mb-4"></div>
                    <div className="bg-[#bdc3c7] rounded-md h-[20px] mb-4 w-[110px]"></div>
                    <div className="bg-[#bdc3c7] rounded-md w-full h-[40px]"></div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
