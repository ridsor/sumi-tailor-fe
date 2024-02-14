"use client";

import { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { AccountModalContext } from "./page";

interface Props {}

export default function AdminItem(props: Props) {
  const { toggleModal, setAccountInput, setInputAction } =
    useContext(AccountModalContext);

  return (
    <tr className="border-b">
      <td className="px-2 text-center">1</td>
      <td className="px-2">Ryan</td>
      <td className="px-2">risorgamerz000001@gmail.com</td>
      <td className="px-2">Aktif</td>
      <td className="align-middle px-2">
        <div className="flex">
          <button
            className="bg-yellow-500 px-2 py-2  rounded-md text-white mr-1"
            onClick={() => {
              toggleModal();
              setInputAction("edit");
              setAccountInput({
                name: "Ryan",
                email: "risorgamerz000001@gmail.com",
              });
            }}>
            <FaEdit />
          </button>
          <button className="bg-fail px-2 py-1  rounded-md text-white">
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}
