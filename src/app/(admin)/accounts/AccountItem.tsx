"use client";

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { UserType } from "@/types/user";
import { Input } from "./AccountList";

interface Props {
  user: UserType;
  auth: UserType;
  no: number;
  onDelete: (id: string) => Promise<void>;
  setInputs: (value: Input) => void;
  toggleModal: () => void;
}

export default function AdminItem(props: Props) {
  return (
    <tr className="border-b">
      <td className="px-2 text-center">{props.no}</td>
      <td className="px-2">{props.user.name}</td>
      <td className="px-2">{props.user.email}</td>
      {props.auth.role === "super admin" && (
        <td className="align-middle px-2">
          <div className="flex">
            <button
              className="bg-yellow-500 px-2 py-2  rounded-md text-white mr-1"
              aria-label="Edit account"
              onClick={() => {
                props.setInputs({
                  type: "edit",
                  data: props.user,
                });
                props.toggleModal();
              }}>
              <FaEdit />
            </button>
            <button
              className="bg-fail px-2 py-1  rounded-md text-white"
              onClick={() => props.onDelete(props.user.id)}
              aria-label="Delete account">
              <FaTrash />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
