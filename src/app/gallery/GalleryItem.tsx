import Image from "next/image";

type Props = {
  image: number;
};

const GalleryItem = (props: Props) => {
  return (
    <div className="shadow-md mb-4">
      <Image
        src={`/image/gallery${props.image}.jpg`}
        alt="gallery-pertama"
        priority
        width={400}
        height={400}
        className="w-full rounded-xl"
      />
    </div>
  );
};

export default GalleryItem;
