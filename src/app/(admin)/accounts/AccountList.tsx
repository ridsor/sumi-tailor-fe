"use client";

import AdminItem from "./AccountItem";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { getToken } from "@/services/token";
import AdminInput from "./AccountInput";
import { UserType } from "@/types/user";
import { useCallback, useState } from "react";
import { deleteUser } from "@/services/user";

type Props = {
  users: UserType[];
  auth: UserType;
};

export type Input = {
  type: string;
  data: {
    id?: string;
    name: string;
    email: string;
    password?: string;
    confirm_password?: string;
  };
};

export default function AdminList(props: Props) {
  const [inputs, setInputs] = useState<Input>({
    type: "create",
    data: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const [isModalInput, setModalInput] = useState<boolean>(false);

  const toggleModalInput = useCallback(() => {
    setModalInput((prev) => !prev);
  }, []);

  const handleDelete = useCallback(async (user_id: string) => {
    try {
      const result = await withReactContent(Swal)
        .mixin({
          customClass: {
            confirmButton: "bg-success px-3 py-1.5 rounded-md text-white ml-1",
            cancelButton: "bg-fail px-3 py-1.5 rounded-md text-white mr-1",
          },
          buttonsStyling: false,
        })
        .fire({
          title: "Apa kamu yakin?",
          text: "Anda tidak akan dapat mengembalikan ini!",
          showCancelButton: true,
          confirmButtonText: "Ya",
          cancelButtonText: "Tidak",
          reverseButtons: true,
        });

      if (result.isConfirmed) {
        const result = await deleteUser(user_id);
        if (result) {
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
        } else {
          withReactContent(Swal)
            .mixin({
              customClass: {
                popup: "max-w-[200px] w-full h-[100px]",
                icon: "!scale-50 -translate-y-8",
                title: "text-sm -translate-y-[4.5rem]",
              },
              buttonsStyling: false,
            })
            .fire({
              position: "top-end",
              icon: "error",
              showConfirmButton: false,
              timer: 1000,
            });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      <AdminInput
        inputs={inputs}
        setInputs={setInputs}
        modal={isModalInput}
        toggleModal={toggleModalInput}
      />
      <div className="w-full overflow-x-auto">
        <p className="mx-2 text-right text-lg">{props.users.length} / 4</p>
        <table className="w-full" cellPadding={10}>
          <thead>
            <tr className="border-b">
              <td width={30} className="font-semibold px-2">
                No
              </td>
              <td className="font-semibold px-2">Nama</td>
              <td className="font-semibold px-2">Email</td>
              {props.auth.role === "super admin" && (
                <td className="font-semibold px-2">Aksi</td>
              )}
            </tr>
          </thead>
          <tbody>
            {props.users.map((user, i) => (
              <AdminItem
                no={i + 1}
                key={user.id}
                user={user}
                onDelete={handleDelete}
                auth={props.auth}
                setInputs={setInputs}
                toggleModal={toggleModalInput}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
