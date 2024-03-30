import OrderLoading from "./OrderLoading";

export default function page() {
  return (
    <main>
      <section className="py-16">
        <div className="container">
          <div className="px-4">
            <div className="relative">
              <div className="w-[200px] rounded-md mb-5 h-[30px] bg-[#bdc3c7]"></div>
              <div className="w-[180px] rounded-md mb-5 h-[15px] bg-[#bdc3c7]"></div>
              <div className="flex gap-2 mb-7">
                <div className="w-[90px] rounded-md mb-5 h-[30px] bg-[#bdc3c7]"></div>
                <div className="w-[90px] rounded-md h-[30px] bg-[#bdc3c7]"></div>
              </div>
              <OrderLoading />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
