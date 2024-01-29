import "./style.css";

const GalleryPage = () => {
  return (
    <>
      <section className="bg-[#E4EEDD]">
        <div className="container px-4">
          <div className="pt-36 pb-16">
            <article className="grid h-full gap-4 p-4 bg-three shadow-md rounded-xl min-h-[1000px] gallery-grid">
              <div className="[grid-area:a] bg-red-500 shadow-md rounded-xl"></div>
              <div className="[grid-area:b] bg-green-500 shadow-md rounded-xl"></div>
              <div className="[grid-area:c] bg-yellow-500 shadow-md rounded-xl"></div>
              <div className="[grid-area:d] bg-blue-500 shadow-md rounded-xl"></div>
              <div className="[grid-area:e] bg-orange-500 shadow-md rounded-xl"></div>
              <div className="[grid-area:f] bg-orange-500 shadow-md rounded-xl"></div>
              <div className="[grid-area:g] bg-blue-500 shadow-md rounded-xl"></div>
              <div className="[grid-area:h] bg-yellow-500 shadow-md rounded-xl"></div>
              <div className="[grid-area:i] bg-green-500 shadow-md rounded-xl"></div>
              <div className="[grid-area:j] bg-red-500 shadow-md rounded-xl"></div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryPage;
