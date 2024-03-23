"use client";

import { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { AccountModalContext } from "./page";
import { User } from "@/services/user";

interface Props {
  user: User;
  onDelete: (id: string) => Promise<void>;
}

export default function AdminItem(props: Props) {
  const { toggleModal, setAccountInput, setInputAction } =
    useContext(AccountModalContext);

  return (
    <tr className="border-b">
      <td className="px-2 text-center">1</td>
      <td className="px-2">{props.user.name}</td>
      <td className="px-2">{props.user.email}</td>
      <td className="align-middle px-2">
        <div className="flex">
          <button
            className="bg-yellow-500 px-2 py-2  rounded-md text-white mr-1"
            onClick={() => {
              toggleModal();
              setInputAction("edit");
              setAccountInput({
                id: props.user.id,
                name: props.user.name,
                email: props.user.email,
              });
            }}>
            <FaEdit />
          </button>
          <button
            className="bg-fail px-2 py-1  rounded-md text-white"
            onClick={() => props.onDelete(props.user.id)}>
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}
