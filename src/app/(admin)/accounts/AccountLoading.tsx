export default function AccountLoading() {
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
            <td className="font-semibold px-2">Aksi</td>
            <td></td>
          </tr>
        </thead>
        <tbody className="animate-pulse">
          <tr className="border-b">
            <td className="px-2 text-center">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[50px] inline-block mr-1" />
            </td>
            <td className="px-2">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px]" />
            </td>
            <td className="px-2">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px]" />
            </td>
            <td className="align-middle px-2">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[50px] inline-block mr-1" />
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[50px] inline-block" />
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-2 text-center">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[50px] inline-block mr-1" />
            </td>
            <td className="px-2">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px]" />
            </td>
            <td className="px-2">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px]" />
            </td>
            <td className="align-middle px-2">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[50px] inline-block mr-1" />
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[50px] inline-block" />
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-2 text-center">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[50px] inline-block mr-1" />
            </td>
            <td className="px-2">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px]" />
            </td>
            <td className="px-2">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[160px]" />
            </td>
            <td className="align-middle px-2">
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[50px] inline-block mr-1" />
              <div className=" rounded-md h-[30px] bg-[#bdc3c7] w-[50px] inline-block" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
