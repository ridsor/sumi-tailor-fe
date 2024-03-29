import Image from "next/image";

type Props = {
  image: number;
};

const GalleryItem = (props: Props) => {
  return (
    <div className="shadow-md mb-4">
      <Image
        src={`/image/gallery${props.image}.jpg`}
        alt={`gallery${props.image}`}
        priority
        width={200}
        height={200}
        className="w-full rounded-xl"
      />
    </div>
  );
};

export default GalleryItem;
