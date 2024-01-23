"use client";

export default function AdminItem() {
  return (
    <tr className="border-b">
      <td className="py-3">1</td>
      <td>Ryan</td>
      <td>ryan@gmail.com</td>
      <td>Aktif</td>
      <td>
        <button className="bg-yellow-500 px-2 py-1  rounded-md text-white mr-1">
          Edit
        </button>
        <button className="bg-fail px-2 py-1  rounded-md text-white">
          Hapus
        </button>
      </td>
    </tr>
  );
}
