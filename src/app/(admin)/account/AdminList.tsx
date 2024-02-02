import AdminItem from "./AdminItem";

interface Props {
  opencloseModal: (value: boolean) => void;
}

export default function AdminList(props: Props) {
  return (
    <div className="w-full min-w-fit overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <td width={30} className="font-semibold">
              No
            </td>
            <td className="font-semibold py-1">Nama</td>
            <td className="font-semibold">Email</td>
            <td className="font-semibold">Terakhir Aktif</td>
            <td className="font-semibold">Aksi</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <AdminItem opencloseModal={props.opencloseModal} />
        </tbody>
      </table>
    </div>
  );
}
