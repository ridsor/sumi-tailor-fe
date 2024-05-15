import { FaXmark } from "react-icons/fa6";
import Modal from "@/components/fragments/Modal";
import { FaExclamationCircle } from "react-icons/fa";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {
  handlePageOrderFinished,
  handlePageOrderUnfinished,
} from "@/lib/redux/features/ordersSlice";
import { createOrder } from "@/services/orders";
import cloud_upload_outlined from "@/assets/img/icons/cloud-upload-outlined.svg";
import Image from "next/image";
import { SlideshowLightbox } from "lightbox.js-react";

export type OrderInput = {
  name: string;
  no_hp: string;
  address: string;
  price: string;
  note: string;
  image: File | string;
};

type Validate = OrderInput;

interface Props {
  toggleModal: () => void;
  modal: boolean;
}

export default function OrderInput(props: Props) {
  const imageRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [InputLoading, setInputLoading] = useState<boolean>(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [inputs, setInputs] = useState<OrderInput>({
    name: "",
    no_hp: "",
    address: "",
    price: "",
    note: "",
    image: "",
  });

  const [validate, setValidate] = useState<Validate>({
    name: "",
    no_hp: "",
    address: "",
    price: "",
    note: "",
    image: "",
  });

  const onValidate = ({
    name,
    no_hp,
    address,
    price,
    note,
    image,
  }: OrderInput): boolean => {
    let result: boolean = false;

    // name
    if (!name) {
      setValidate((prev) => ({ ...prev, name: "Nama tidak boleh kosong" }));
      result = true;
    } else if (name.length > 100) {
      setValidate((prev) => ({
        ...prev,
        name: "Nama harus memiliki maks 100 karakter",
      }));
      result = true;
    } else {
      setValidate((prev) => ({
        ...prev,
        name: "",
      }));
    }

    // no_hp
    if (!no_hp) {
      setValidate((prev) => ({
        ...prev,
        no_hp: "Kategori tidak boleh kosong",
      }));
      result = true;
    } else if (no_hp.length > 100) {
      setValidate((prev) => ({
        ...prev,
        no_hp: "Kategori harus memiliki maks 100 karakter",
      }));
      result = true;
    } else {
      setValidate((prev) => ({
        ...prev,
        no_hp: "",
      }));
    }

    // address
    if (!address) {
      setValidate((prev) => ({
        ...prev,
        address: "Kategori tidak boleh kosong",
      }));
      result = true;
    } else if (address.length > 1000) {
      setValidate((prev) => ({
        ...prev,
        address: "Kategori harus memiliki maks 1000 karakter",
      }));
      result = true;
    } else {
      setValidate((prev) => ({
        ...prev,
        address: "",
      }));
    }

    // price
    if (isNaN(parseInt(price)) && price !== "") {
      setValidate((prev) => ({
        ...prev,
        price: "Harga harus angka",
      }));
      result = true;
    } else if (price.length > 500) {
      setValidate((prev) => ({
        ...prev,
        price: "Harga harus memiliki maks 100 karakter",
      }));
      result = true;
    } else {
      setValidate((prev) => ({
        ...prev,
        price: "",
      }));
    }

    if (!note) {
      setValidate((prev) => ({
        ...prev,
        note: "Catatan tidak boleh kosong",
      }));
      result = true;
    } else if (note.length > 1000) {
      setValidate((prev) => ({
        ...prev,
        note: "Catatan harus memiliki maks 1000 karakter",
      }));
      result = true;
    } else {
      setValidate((prev) => ({
        ...prev,
        note: "",
      }));
    }

    // image
    try {
      image = image as File;
      if (!image) {
        setValidate((prev) => ({
          ...prev,
          image: "Foto pesanan tidak boleh kosong",
        }));
        result = true;
      } else if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
        setValidate((prev) => ({
          ...prev,
          image: "Berkas tidak mendukung",
        }));
        result = true;
      } else if (image.size > 5 * 1000 * 1024) {
        setValidate((prev) => ({
          ...prev,
          image: "File harus kurang dari 5mb",
        }));
        result = true;
      } else {
        setValidate((prev) => ({
          ...prev,
          image: "",
        }));
      }
    } catch (e) {
      console.error(e);
    }

    return result;
  };

  const resetInput = () => {
    setImagePreviewUrl("");
    if (imageRef.current) {
      imageRef.current.value = "";
    }
    setValidate({
      name: "",
      no_hp: "",
      address: "",
      price: "",
      note: "",
      image: "",
    });
    setInputs({
      name: "",
      no_hp: "",
      address: "",
      price: "",
      note: "",
      image: "",
    });
  };

  const onSubmitEventHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidate({
      name: "",
      no_hp: "",
      address: "",
      price: "",
      note: "",
      image: "",
    });

    if (onValidate(inputs)) return;

    setInputLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", inputs.name);
      formData.append("no_hp", inputs.no_hp);
      formData.append("address", inputs.address);
      formData.append("price", inputs.price);
      formData.append("note", inputs.note);
      formData.append("image", inputs.image as File);

      const createResponse = await createOrder(formData);

      if (createResponse?.status != "success") {
        console.error("Failed to input");
        if (typeof createResponse?.errors.no_hp != "undefined") {
          setValidate((prev) => ({
            ...prev,
            no_hp: createResponse?.errors.no_hp,
          }));
        }
        setInputLoading(false);
        return;
      }

      if (
        searchParams.get("oupage") != null &&
        searchParams.get("oupage") != "1"
      ) {
        router.push("/orders");
      } else {
        const search = searchParams.get("s") || "";
        dispatch(handlePageOrderUnfinished({ page: 1, search }));
      }
      if (
        searchParams.get("ofpage") != null &&
        searchParams.get("ofpage") != "1"
      ) {
        router.push("/orders");
      } else {
        const search = searchParams.get("s") || "";
        dispatch(handlePageOrderFinished({ page: 1, search }));
      }

      withReactContent(Swal)
        .mixin({
          customClass: {
            popup: "max-w-[200px] w-full h-[100px]",
            icon: "scale-50 -translate-y-8",
          },
          buttonsStyling: false,
        })
        .fire({
          position: "top-end",
          icon: "success",
          showConfirmButton: false,
          timer: 500,
        });
    } catch (e) {
      console.log(e);
    }

    props.toggleModal();
    setInputLoading(false);
  };

  const onChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeEventHandlerImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    setInputs((prev) => ({
      ...prev,
      [e.target.name]: files?.item(0),
    }));

    try {
      setImagePreviewUrl(URL.createObjectURL(files?.item(0) as File));
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageClick = () => {
    imageRef.current?.click();
  };

  useEffect(() => {
    if (props.modal) {
      resetInput();
    }
  }, [props.modal]);

  return (
    <Modal active={props.modal} openclose={props.toggleModal}>
      <div className="container max-w-full">
        <div className="title-modal font-semibold text-xl px-3 py-2 border-b relative">
          Buat Pesanan
          <button
            className="absolute top-1/2 -translate-y-1/2 right-3"
            aria-label="Exit Modal"
            onClick={() => props.toggleModal()}>
            <FaXmark />
          </button>
        </div>
        <form method="post" className="p-4" onSubmit={onSubmitEventHandler}>
          <div className="form-input mb-3 relative">
            <input
              type="text"
              placeholder="Nama"
              name="name"
              className={`${
                validate.name ? "border-fail pr-11 relative" : ""
              } w-full border rounded-sm py-2 px-3 relative z-10 outline-two`}
              onChange={onChangeEventHandler}
              value={inputs.name}
            />
            {validate.name ? (
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <button
                  type={"button"}
                  className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                  <FaExclamationCircle />
                </button>
                <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                  <span>{validate.name}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-input mb-3 relative">
            <input
              type="text"
              placeholder="No Handphone"
              name="no_hp"
              className={`${
                validate.no_hp ? "border-fail pr-11" : ""
              } w-full border rounded-sm py-2 px-3 relative z-10 outline-two`}
              onChange={onChangeEventHandler}
              value={inputs.no_hp}
            />
            {validate.no_hp ? (
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <button
                  type={"button"}
                  className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                  <FaExclamationCircle />
                </button>
                <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                  <span>{validate.no_hp}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-input mb-3 relative">
            <input
              type="text"
              placeholder="Alamat"
              name="address"
              className={`${
                validate.address ? "border-fail pr-11" : ""
              } w-full border rounded-sm py-2 px-3 relative z-10 outline-two`}
              onChange={onChangeEventHandler}
              value={inputs.address}
            />
            {validate.address ? (
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <button
                  type={"button"}
                  className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                  <FaExclamationCircle />
                </button>
                <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                  <span>{validate.address}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-input mb-3 relative">
            <input
              type="text"
              placeholder="Harga"
              name="price"
              className={`${
                validate.price ? "border-fail pr-11" : ""
              } w-full border rounded-sm py-2 px-3 relative z-10 outline-two`}
              onChange={onChangeEventHandler}
              value={inputs.price}
            />
            {validate.price ? (
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <button
                  type={"button"}
                  className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                  <FaExclamationCircle />
                </button>
                <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                  <span>{validate.price}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-input mb-3 relative">
            <textarea
              name="note"
              placeholder="Catatan"
              rows={4}
              className={`${
                validate.note ? "border-fail pr-11" : ""
              } w-full border rounded-sm py-2 px-3 relative z-10 outline-two`}
              onChange={onChangeEventHandler}
              value={inputs.note}></textarea>
            {validate.note ? (
              <div className="absolute top-0 right-0 left-0 bottom-0">
                <button
                  type={"button"}
                  className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                  <FaExclamationCircle />
                </button>
                <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                  <span>{validate.note}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-input mb-8 relative">
            <div
              className={`${
                validate.image ? "border-fail" : "bg-[#F4F4F4]"
              } border-dashed flex flex-col items-center border-2  p-4`}>
              <input
                ref={imageRef}
                type="file"
                placeholder="Foto Pesanan"
                name="image"
                id="image"
                accept="image/png, image/jpeg, image/jpg"
                onChange={onChangeEventHandlerImage}
                hidden
              />
              {imagePreviewUrl ? (
                <div className="min-w-[100px] w-[100px] h-[100px] relative z-20 overflow-hidden rounded-sm bg-gray-400 lightbox-image">
                  <SlideshowLightbox
                    showControls={false}
                    lightboxIdentifier="lightbox-create-order"
                    framework="next"
                    fullScreen={true}
                    modalClose="clickOutside"
                    images={[{ src: imagePreviewUrl, alt: "Foto Pesanan" }]}>
                    <Image
                      src={imagePreviewUrl}
                      alt="Foto Pesanan"
                      width={250}
                      height={250}
                      className="w-full h-auto object-cover"
                      data-lightboxjs="lightbox-create-order"
                      quality={50}
                    />
                  </SlideshowLightbox>
                </div>
              ) : (
                <>
                  <Image src={cloud_upload_outlined} alt="" />
                  <p className="text-[#afafaf] font-semibold text-base">
                    Upload Foto Pesanan (JPG, JPEG, PNG)
                  </p>
                </>
              )}
              <button
                type="button"
                onClick={handleImageClick}
                id="btn_upload_image"
                className="block text-two font-semibold  bg-white border mt-4 rounded-[5px] border-[#d4d4d4] py-[10px] px-[17px] relative z-50">
                Browse File
              </button>
              {validate.image ? (
                <div className="absolute top-0 right-0 left-0 bottom-0">
                  <button
                    type={"button"}
                    className="text-fail block absolute top-1/2 -translate-y-1/2 right-4 peer z-20">
                    <FaExclamationCircle />
                  </button>
                  <div className="validate-message absolute right-12 top-1/2 -translate-y-1/2 z-20 max-w-full w-fit bg-fail text-white px-2 py-1 rounded-md before:content-[''] before:block before:absolute before:left-[calc(100%-1rem)] before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-fail before:-rotate-[36deg] before:skew-x-[20deg] before:-z-10 opacity-0 pointer-events-none transition-all peer-focus:opacity-100 peer-focus:pointer-events-auto peer-hover:opacity-100 peer-hover:pointer-events-auto">
                    <span>{validate.image as string}</span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="form-input">
            <button className="w-full bg-two px-3 py-2 text-white rounded-sm font-semibold">
              {InputLoading ? "Loading..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
