import GalleryList from "./GalleryList";

const GalleryPage = () => {
  return (
    <main>
      <section className='mb-[125px] pt-[125px]'>
        <div className='container px-4'>
          <div>
            <h2 className='mb-8 text-5xl text-center font-pt-serif text-background lg:text-one'>
              Galeri
            </h2>
            <h3 className='mb-2 text-xl text-center text-one font-pt-serif'>
              Galeri Karya Jahitan Kami
            </h3>
            <p className='mb-8 text-center'>
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
