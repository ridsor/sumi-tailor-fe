import AdminItem from "./AdminItem";

interface Props {
  opencloseModal: (value: boolean) => void;
}

export default function AdminList(props: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full" cellPadding={10}>
        <thead>
          <tr className="border-b">
            <td width={30} className="font-semibold px-2">
              No
            </td>
            <td className="font-semibold px-2">Nama</td>
            <td className="font-semibold px-2">Email</td>
            <td className="font-semibold px-2">Terakhir Aktif</td>
            <td className="font-semibold px-2">Aksi</td>
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
