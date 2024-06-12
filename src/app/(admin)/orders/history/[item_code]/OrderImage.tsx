"use client";

import NextJsImage from "@/components/fragments/NextJsImage";
import { OrderHistoryType } from "@/types/order";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Props {
  order: OrderHistoryType;
}

export default function OrderImage(props: Props) {
  const [openLightbox, setOpenLightbox] = useState<boolean>(false);

  const slides = [
    {
      src: `${process.env.NEXT_PUBLIC_API_URL}/order-images/${props.order.image}`,
      alt: `${props.order.name}-${props.order.item_code}`,
    },
  ];

  return (
    <div className="lightbox-image min-w-[150px] w-[150px] h-[150px] relative z-20 overflow-hidden rounded-sm mb-3">
      <button
        type="button"
        onClick={() => setOpenLightbox(true)}
        className="w-full h-full">
        <Image
          src={slides[0].src}
          alt={slides[0].alt}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </button>
      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={slides}
        render={{
          slide: NextJsImage,
          iconNext: () => null,
          iconPrev: () => null,
        }}
        noScroll={{ disabled: true }}
        carousel={{ finite: true }}
      />
    </div>
  );
}
