"use client";
import Modal from "@/components/fragments/Modal";
import { downloadImageFromElement } from "@/utils/order";
import { useCallback, useRef, useState } from "react";
import { FaCopy, FaXmark } from "react-icons/fa6";
import QRCode from "react-qr-code";

interface Props {
  active: boolean;
  openclose: () => void;
}

export default function TokenModal(props: Props) {
  const [orderRegisterToken, setOrderRegisterToken] = useState<string>("");
  const orderRegisterQrCodeRef = useRef<HTMLDivElement>(null);

  const copyTokenURL = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      navigator.clipboard.writeText(orderRegisterToken);
    },
    [orderRegisterToken]
  );

  const handleResetOrderRegisterToken = useCallback(async () => {
    const token = "";

    setOrderRegisterToken(token);
  }, []);

  const handleDownloadQRCode = useCallback(() => {
    const element = orderRegisterQrCodeRef.current;
    downloadImageFromElement(
      element as HTMLDivElement,
      `registertoken-qrcode.png`
    );
  }, []);

  return (
    <Modal active={props.active} openclose={props.openclose} size="max-w-xl">
      <div className="container max-w-full">
        <div className="title-modal font-semibold text-xl px-3 py-2 border-b relative">
          Token Pendaftaran Pesanan
          <button
            className="absolute top-1/2 -translate-y-1/2 right-3"
            onClick={() => props.openclose()}>
            <FaXmark />
          </button>
        </div>
        <div>
          <div
            className="w-full aspect-square bg-white p-12"
            id="register-order-qrcode"
            ref={orderRegisterQrCodeRef}>
            {orderRegisterToken && (
              <QRCode
                size={500}
                value={orderRegisterToken}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 256 256`}
              />
            )}
          </div>
          <div className="p-4">
            <button
              className="px-3 py-2 bg-[#444] hover:bg-[#333] border text-white rounded-md block mx-auto mt-3"
              onClick={handleDownloadQRCode}>
              Download
            </button>
            <div className="py-4 flex items-center justify-center gap-x-3">
              <span
                id="order_register_url_token"
                className="fleading- text-ellipsis w-full overflow-hidden [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                {orderRegisterToken}
              </span>
              <button onClick={copyTokenURL} className="text-xl">
                <FaCopy />
              </button>
            </div>
            <button
              className="px-3 py-2 bg-two text-white rounded-md block mx-auto hover:bg-four"
              onClick={handleResetOrderRegisterToken}>
              Reset Token
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
