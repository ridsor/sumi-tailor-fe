import GalleryList from "./GalleryList";

const GalleryPage = () => {
  return (
    <main>
      <section className="bg-[#E4EEDD] py-36">
        <div className="container px-4">
          <div>
            <h2 className="mb-2 text-3xl text-center font-pt-serif">
              Galeri Karya Jahitan Kami
            </h2>
            <p className="mb-8 text-center">
              Telusuri berbagai karya jahitan eksklusif yang telah kami ciptakan
              dengan dedikasi. Setiap potong pakaian adalah hasil dari keahlian
              tinggi dan perhatian pada detail, dibuat khusus untuk memberikan
              sentuhan elegan dan kenyamanan bagi Anda.
            </p>
            <GalleryList />
          </div>
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;
