const loading = () => {
  const amount = 10;
  let images: number[] = [];

  for (let i = 1; i <= amount; i++) {
    images.push(i);
  }

  return (
    <main>
      <section className="bg-[#E4EEDD]">
        <div className="container px-4">
          <div className="pt-36 pb-16">
            <article className="columns-2 md:columns-3 lg:columns-5 gap-4 p-4 bg-three shadow-md rounded-xl animate-pulse">
              {images.map((n) => (
                <div
                  className="shadow-md mb-4 h-[300px] rounded-xl bg-[#bdc3c7]"
                  key={n}></div>
              ))}
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default loading;
