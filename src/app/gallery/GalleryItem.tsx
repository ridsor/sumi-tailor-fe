import Image from "next/image";

type Props = {
  image: number;
};

const GalleryItem = (props: Props) => {
  return (
    <div className="overflow-hidden shadow-md rounded-xl">
      <Image
        src={`/image/gallery${props.image}.jpg`}
        alt="gallery-pertama"
        priority
        width={400}
        height={400}
        className="object-cover w-full"
      />
    </div>
  );
};

export default GalleryItem;
