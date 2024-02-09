import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Data_Table from "../../component/data_table/Data_Table";
import { Button } from "@mui/material";

const EnquiryMaterial = () => {
  const [IndentMaterial, setIndentMaterial] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  // for handle Accept click
  const handleAcceptClick = () => {
    console.log(location.state);
    navigate("/materialPricesTable", {
      state: { materialData: location.state },
    });
  };

  //console.log(materialData)
  //   this is column
  const columns = [
    { field: "UOMName", headerName: "UOM Name", width: "150" },
    { field: "MaterialName", headerName: "Material Name", width: "150" },
    { field: "Quantity", headerName: "Quantity", width: "150" },
    {
      field: "DeliveryDate",
      headerName: "Delivery Date",
      width: "200",
    },
    {
      field: "action",
      headerName: "Action",

      width: 230,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
            }}
          >
            <div className="editButton">
              <Button
                variant="contained"
                color="success"
                onClick={handleAcceptClick}
              >
                Accept
              </Button>
            </div>
            <div
              style={{
                marginLeft: "1rem",
              }}
            >
              <Button variant="contained" color="error">
                Reject
              </Button>
            </div>
          </div>
        );
      },
    },
  ];
  //

  useEffect(() => {
    if (location?.state) {
      setIndentMaterial(
        location?.state?.map((item, idx) => ({ ...item, id: idx + 1 }))
      );
    }
  });
  return (
    <div style={{ marginTop: "2rem", padding: "2rem" }}>
      <Data_Table columns={columns} rows={IndentMaterial} />
    </div>
  );
};

export default EnquiryMaterial;
