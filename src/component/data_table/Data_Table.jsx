import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { Box } from "@mui/material";

const INITIAL_STATE = ({ page, pageSize, pageSizeOptionList }) => ({
  page,
  pageSize,
  pageSizeOptionList,
});

const Data_Table = (props) => {
  const {
    getRowId,
    rows = [],
    columns = [],
    pagination = true,
    paginationMode = "client",
    page = 0,
    pageSize = 10,
    pageSizeOptionList = [10, 20, 50],
    disableSelectionOnClick = true,
    onPageDataChange = (e) => e,
    rowCount,
    onCellEditCommit
    // checkboxSelection = true,
  } = props;

  //state
  const [state, setState] = useState(
    INITIAL_STATE({ page, pageSize, pageSizeOptionList })
  );

  /** Handlers */
  const onTablePageSizeChangeHandler = (size) => {
    setState((prevState) => ({ ...prevState, pageSize: size }));
  };

  const onTablePageChangeHandler = (number) => {
    setState((prevState) => ({ ...prevState, page: number }));
  };
  //
  /** Effects */
  useEffect(() => {
    (async () => {
      await onPageDataChange({ page: state.page, pageSize: state.pageSize });
    })();
  }, [state.pageSize, state.page]);

  return (
    <div>
      <Box
        sx={{
          height: 600,
        }}
      >
      <DataGrid
      className="dataTable"
      sx={{
        boxShadow: 1,
        border: 2,
        fontFamily: '"Nunito", sans-serif',
        borderColor: "white",
        backgroundColor: "White",
        boxShadow:
          "0px 5px 5px -11px gray, 0px 3px 1px 1px rgba(0, 0, 0, 0.14), 0px 3px 4px 2px gray",

        "& .MuiDataGrid-cell:hover": {
          borderRadius: "10px",
        },
        "&  .MuiDataGrid-columnHeaders": {
          color: "black",
          backgroundColor: "lightgray",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "550",

          color: "black",
          fontFamily: '"Nunito", sans-serif',
        },
      }}
      disableColumnMenu={true}
      disableColumnFilter={true}
      getRowId={getRowId}
      rows={rows}
      columns={columns}
      pagination={pagination}
      paginationMode={paginationMode}
      page={state.page}
      onPageChange={onTablePageChangeHandler}
      pageSize={state.pageSize}
      onPageSizeChange={onTablePageSizeChangeHandler}
      rowCount={rowCount || (rows || []).length}
      rowsPerPageOptions={state.pageSizeOptionList}
      disableSelectionOnClick={disableSelectionOnClick}
      isCellEditable={() => true} // Set this to allow all cells to be editable
      experimentalFeatures={{ newEditingApi: true }}
      editable={{
        onCellEditCommit: onCellEditCommit
      }}
    />

      </Box>
    </div>
  );
};

export default Data_Table;
