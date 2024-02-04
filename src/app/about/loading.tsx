const loading = () => {
  return (
    <main className="animate-pulse">
      <section className="bg-three relative">
        <div className="container">
          <article className="row lg:min-h-[600px] px-4 lg:px-8 pt-36 pb-16">
            <div className="lg:flex mb-10">
              <div className="bg-[#bdc3c7] rounded-md h-[288px] aspect-square mb-12 lg:mb-0 mx-auto lg:m-0"></div>
              <div className="lg:mt-12 lg:ml-12 w-full">
                <div className="bg-[#bdc3c7] rounded-md h-[50px] w-[250px] mb-10"></div>
                <div className="bg-[#bdc3c7] rounded-md h-[200px] w-full"></div>
              </div>
            </div>
            <div className="bg-[#bdc3c7] rounded-md h-[120px] w-full"></div>
            <br />
            <div className="bg-[#bdc3c7] rounded-md"></div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default loading;
