import { getDay, getMonth, getTime, getYear } from "@/utils/order";
import { OrderType } from "@/lib/redux/features/ordersSlice";
import Link from "next/link";
import Image from "next/image";
import { SlideshowLightbox } from "lightbox.js-react";

interface Props {
  order: OrderType;
}

export default function OrderItem(props: Props) {
  const handleBtnActionOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    const menuItem = document.querySelectorAll(".menu-item");
    menuItem.forEach((x) => {
      if (!e.currentTarget.nextElementSibling?.classList.contains("active")) {
        x.classList.remove("active");
      }
    });
    e.currentTarget.nextElementSibling?.classList.toggle("active");
  };

  const images = [
    {
      src: `${process.env.NEXT_PUBLIC_API_URL}/order-images/${props.order.image}`,
      alt: props.order.name,
    },
  ];

  return (
    <div className="order flex border rounded-md shadow-sm relative p-2">
      <Link
        href={`/orders/${props.order.item_code}`}
        className="absolute top-0 bottom-0 left-0 right-0 bg-transparent rounded-md z-10"
        aria-label="Order Item"></Link>
      <div className="flex-1 self-center">
        <div className="order-image min-w-[80px] w-[80px] h-[80px] relative z-20 overflow-hidden rounded-sm">
          <SlideshowLightbox
            showControls={false}
            lightboxIdentifier="lightbox1"
            framework="next"
            fullScreen={true}
            modalClose="clickOutside"
            images={images}>
            {images.map((image, i) => (
              <Image
                key={i}
                src={image.src}
                alt={image.alt}
                width={250}
                height={250}
                className="w-full h-auto object-cover"
                data-lightboxjs="lightbox1"
                quality={50}
              />
            ))}
          </SlideshowLightbox>
        </div>
      </div>
      <div className="order-body py-1.5 px-3 flex flex-col gap-y-1 w-full">
        <h4 className="font-semibold text-base">{props.order.name}</h4>
        <div className="grid flex-1 sm:grid-flow-col">
          <div className="date text-blue-400">{`${getDay(
            props.order.updated_at
          )} ${getMonth(props.order.updated_at)} ${getYear(
            props.order.updated_at
          )}, ${getTime(props.order.updated_at)} WIT`}</div>
          <div className="price font-semibold text-two text-base justify-self-end mt-1 self-end">
            Rp10.000
          </div>
        </div>
      </div>
    </div>
  );
}
