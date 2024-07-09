import GalleryItem from "./GalleryItem";

const GalleryList = () => {
  const amount = 14;
  let images: number[] = [];

  for (let i = 1; i <= amount; i++) {
    images.push(i);
  }

  return (
    <article className="columns-2 border md:columns-3 lg:columns-5 gap-4 p-4 bg-three shadow-md rounded-xl">
      {images.map((n) => (
        <GalleryItem image={n} key={n} />
      ))}
    </article>
  );
};

export default GalleryList;
