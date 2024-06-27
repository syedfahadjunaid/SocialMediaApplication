import { Fragment } from "react";
import PaginationComponent from "./Pagination/PaginationComponent";
import { useState } from "react";
// import { CiMenuKebab } from 'react-icons/ci';

// function Echo({children}) {    /// can be used instead of Fragment
//     return children;
// }

function Table({ data, config, keyFn }) {
  //Table Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // ////////////////////////////////////////

  const renderedHeaders = config?.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return (
      <th
        className='text-center px-[4px] border-b-0 border-r-[1px] border-solid border-r-[#00000033]'
        key={column.label}>
        {column.label}
      </th>
    );
  });

  const renderedRows = data
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    ?.map((row, index) => {
      const renderedCells = config?.map((column, index) => {
        return (
          <td
            key={`column-${index}`}
            className='justify-center text-[14px] py-4 px-[4px] text-center border-r-[1px] border-solid border-r-[#00000033]'>
            {column.render(row)}
          </td>
        );
      });

      return (
        <tr className='' key={keyFn(row)}>
          {renderedCells}
          {/* {
            <div className="flex flex-row items-center justify-center">
              <CiMenuKebab
                onClick={() => setActionBar(`${row.id}-${index}`)}
                className="h-full w-fit"
              />
              {actionBar ? (
                <div className="flex flex-col bg-white p-[8px] shadow-md">
                  <p className="border-b">Edit</p>
                  <p className="">Delete</p>
                </div>
              ) : null}
            </div>
          } */}
        </tr>
      );
    });

  return (
    <div>
      <table className='w-full table-auto border-spacing-2 text-[#595959] font-[300] bg-[#80011F0D]'>
        <thead>
          <tr className='bg-[#D9D9D980]'>{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
      <PaginationComponent
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        data={data}
      />
    </div>
  );
}

export default Table;
