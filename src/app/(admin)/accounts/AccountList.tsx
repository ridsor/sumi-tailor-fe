import { User } from "@/services/user";
import AdminItem from "./AccountItem";
import { useCallback } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { getToken } from "@/services/auth";
import { useAppSelector } from "@/lib/redux/hooks";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  users: User[];
  loadUsers: () => void;
};

export default function AdminList(props: Props) {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        const result = await withReactContent(Swal)
          .mixin({
            customClass: {
              confirmButton:
                "bg-success px-3 py-1.5 rounded-md text-white ml-1",
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
          const token = await getToken(session?.user.refreshToken || "");

          const res = await fetch(
            (process.env.NEXT_PUBLIC_API_URL as string) +
              "/api/auth/delete/" +
              id,
            {
              method: "DELETE",
              credentials: "include",
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );

          if (res.status != 200) {
            console.error("Failed to delete");
            return;
          }

          const search = searchParams.get("s") || "";
          props.loadUsers();
        }
      } catch (e) {
        console.error(e);
      }
    },
    [props, searchParams, session]
  );

  return (
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
            {session?.user.role === "super admin" && (
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
