"use client";

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

interface Props {
  opencloseModal: (value: boolean) => void;
}

export default function AdminItem(props: Props) {
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
            onClick={() => props.opencloseModal(true)}>
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
