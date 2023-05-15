import { useMemo } from "react";
import {
  useTable,
  useSortBy,
  Column,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { DocumentData } from "firebase/firestore";
import Add from "../../components/Add";
import Delete from "../../components/Delete";
import Edit from "../../components/Edit";
import DownloadButton from "../../components/DownloadButton";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BiUpArrowAlt } from "react-icons/bi";
import { RxDoubleArrowRight } from "react-icons/rx";
import { RxArrowRight } from "react-icons/rx";
import { RxArrowLeft } from "react-icons/rx";
import { RxDoubleArrowLeft } from "react-icons/rx";

const TableUI = ({ usersData }: { usersData: DocumentData[] }) => {
  const columns = useMemo<Column<DocumentData>[]>(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: (allData) => {
          const currCellData = allData.row.original;
          return (
            <>
              <div className="flex flex-row">
                <img
                  src={currCellData.photo || ""}
                  alt="Profile"
                  className="rounded-full drop-shadow-lg w-[50px] h-[50px] mr-3"
                />
                <div className="flex justify-center flex-col">
                  <div className="font-medium">{currCellData.name}</div>
                  <div className="text-gray-600 text-sm">
                    {currCellData.email}
                  </div>
                </div>
              </div>
            </>
          );
        },
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: (allData) => {
          const currCellData = allData.row.original;
          return (
            <>
              <div className="text-gray-600">{currCellData.email}</div>
            </>
          );
        },
      },
      {
        Header: "Role",
        accessor: "role",
        Cell: (allData) => {
          const currCellData = allData.row.original;
          return (
            <>
              <div className="text-gray-600">{currCellData.role}</div>
            </>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (allData) => {
          const currCellData = allData.row.original;
          if (currCellData.status === "Invited") {
            return (
              <>
                <span className="w-[90px] rounded-full bg-gray-300 py-1 px-3 flex items-center">
                  <div className="inline-block w-[7px] h-[7px]  mr-2 rounded-full bg-gray-700" />
                  {currCellData.status}
                </span>
              </>
            );
          }
          return (
            <>
              <span className="w-[90px]  rounded-full bg-green-200 py-1 px-2 flex items-center">
                <div className="inline-block w-[7px] h-[7px]  mr-2 rounded-full bg-green-700" />
                {currCellData.status}
              </span>
            </>
          );
        },
      },
      {
        Header: "Last Login Date",
        accessor: "lastLoginTime",
        Cell: (allData) => {
          const currCellData = allData.row.original;
          return (
            <>
              <div>{currCellData.lastLoginDate}</div>
              <div className="text-gray-600 text-sm">
                {currCellData.lastLoginTime}
              </div>
            </>
          );
        },
      },
      {
        Header: "",
        accessor: "lastLoginDate",
        Cell: (allData) => {
          return (
            <>
              <div className="flex justify-between">
                <Delete data={allData.row.original} />
                <Edit data={allData.row.original} />
              </div>
            </>
          );
        },
      },
    ],
    []
  );

  const data = useMemo(() => usersData, [usersData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <div className="flex justify-between items-center bg-[#E5D1FA] mb-2">
        <div className="flex">
          <input
            className="border-2 border-gray-300 bg-white h-[3.5rem] px-5 rounded-lg text-sm focus:outline-none"
            type="search"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div className="flex py-2">
          <Add />
          <DownloadButton usersData={usersData} />
        </div>
      </div>
      <table {...getTableProps()} className="table-auto w-full bg-[#FFF4D2]">
        <thead className="bg-gray-200 ">
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2 text-start"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <AiOutlineArrowDown />
                      ) : (
                        <BiUpArrowAlt />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="text-center">
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="border px-4 py-2 text-start"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination rounded-bl-lg border-t-2 border-gray-100 rounded-br-lg w-full bg-white px-4 py-6 flex gap-4 items-center justify-between">
        <div className="flex">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="rounded-md p-2  border border-gray-300 hover:bg-gray-200 active:bg-gray-400 disabled:bg-gray-300 mr-2"
          >
            <RxDoubleArrowLeft />
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="flex items-center rounded-md p-2  border border-gray-300 hover:bg-gray-200 active:bg-gray-400 disabled:bg-gray-300"
          >
            <RxArrowLeft />
            Previous
          </button>
        </div>
        <div>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <input
            type="number"
            defaultValue={pageIndex + 1}
            placeholder="Go To"
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            className="w-[75px] mx-3 border-2 border-blue-100 focus-visible:border-blue-300 focus-visible:bg-gray-100 outline-none rounded-md p-2 shadow-sm focus:shadow-lg"
          />
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="w-[100px] border border-blue-100 focus-visible:border-blue-800 focus-visible:bg-gray-100 outline-none rounded-md p-2 shadow-sm focus:shadow-lg"
          >
            {[5, 10, 20, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex">
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="flex items-center rounded-md p-2  border border-gray-300 hover:bg-gray-200 active:bg-gray-400 disabled:bg-gray-300"
          >
            Next <RxArrowRight />
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="rounded-md p-2  border border-gray-300 hover:bg-gray-200 active:bg-gray-400 disabled:bg-gray-300 ml-2"
          >
            <RxDoubleArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default TableUI;
