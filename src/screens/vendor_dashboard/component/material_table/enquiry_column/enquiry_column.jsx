import { Button } from "@mui/material";

export const enquiryColumn = (handleViewClick) => [
  { field: "companyName", headerName: "Company Name", width: 160 },
  { field: "Type", headerName: "Type", width: 180 },
  { field: "role", headerName: "Role", width: 140 },
  { field: "Qty", headerName: "Qty", width: 80 },
  {
    field: "Action",
    width: 200,
    renderCell: (params) => (
      <div>
        <Button onClick={() => handleViewClick(params.row)}>view</Button>
      </div>
    ),
  },
];
