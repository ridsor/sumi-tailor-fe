"use client";

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

interface Props {
  opencloseModal: (value: boolean) => void;
}

export default function AdminItem(props: Props) {
  return (
    <tr className="border-b">
      <td className="py-3">1</td>
      <td>Ryan</td>
      <td>ryan@gmail.com</td>
      <td>Aktif</td>
      <td className="align-middle">
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
