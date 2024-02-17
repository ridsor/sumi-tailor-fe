import Modal from "@/components/fragments/Modal";
import { FaXmark } from "react-icons/fa6";

interface Props {
  active: boolean;
  openclose: () => void;
}

export default function TokenModal(props: Props) {
  return (
    <Modal active={props.active} openclose={props.openclose} size="max-w-2xl">
      <div className="container max-w-full">
        <div className="title-modal font-semibold text-xl px-3 py-2 border-b relative">
          Token Pendaftaran Pesanan
          <button
            className="absolute top-1/2 -translate-y-1/2 right-3"
            onClick={() => props.openclose()}>
            <FaXmark />
          </button>
        </div>
      </div>
    </Modal>
  );
}
