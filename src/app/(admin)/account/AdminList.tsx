import AdminItem from "./AdminItem";

export default function AdminList() {
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
          <AdminItem />
        </tbody>
      </table>
    </div>
  );
}
