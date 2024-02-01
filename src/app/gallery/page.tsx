import GalleryList from "./GalleryList";

const GalleryPage = () => {
  return (
    <main>
      <section className="bg-[#E4EEDD]">
        <div className="container px-4">
          <div className="pt-36 pb-16">
            <GalleryList />
          </div>
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;
