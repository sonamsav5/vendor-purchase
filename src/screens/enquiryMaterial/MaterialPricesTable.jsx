// MaterialPricesTable.js
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Data_Table from "../../component/data_table/Data_Table";
import { useLocation } from "react-router-dom";
import Add_Price_Form from "./add_price_form/Add_Price_Forma";

const MaterialPricesTable = () => {
  const location = useLocation();
  const [IndentMaterial, setIndentMaterial] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [disabledRows, setDisabledRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null); // Define selectedRowId state
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // State to track form submission

  const columns = [
    { field: "UOMName", headerName: "UOM Name", width: 150 },
    { field: "MaterialName", headerName: "Material Name", width: 150 },
    { field: "DeliveryDate", headerName: "Delivery Date", width: 200 },
    { field: "Quantity", headerName: "Quantity", width: 150 },
    ...(isFormSubmitted // Conditionally add columns if form is submitted
      ? [
          { field: "rate", headerName: "Rate", width: 150 },
          { field: "cgst", headerName: "CGST", width: 150 },
          { field: "igst", headerName: "IGST", width: 150 },
          { field: "discount", headerName: "Discount", width: 150 },
          { field: "total", headerName: "Total", width: 150 },
        ]
      : []),
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params) => {
        const rowId = params.id;
        const isDisabled = disabledRows.includes(rowId);
        return (
          <div className="editButton">
            <Button
              variant="contained"
              color="secondary"
              disabled={isDisabled}
              onClick={() => handleAddPriceClick(rowId)}
            >
              Add Price
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (location?.state) {
      setIndentMaterial(
        location?.state?.materialData?.map((item, idx) => ({
          ...item,
          id: idx + 1,
          rate: "",
          cgst: "",
          igst: "",
          discount: "",
          total: "",
        }))
      );
    }
  }, [location.state]);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSaveDialog = (formData) => {
    // Update the table data with the new form data
    const updatedRows = IndentMaterial.map((row) => {
      if (row.id === selectedRowId) {
        return {
          ...row,
          rate: formData.rate,
          cgst: formData.cgst,
          igst: formData.igst,
          discount: formData.discount,
          total: formData.total,
        };
      }
      return row;
    });
    setIndentMaterial(updatedRows);
    setDisabledRows([...disabledRows, selectedRowId]); // Disable the button for the row
    setIsFormSubmitted(true); // Set form submission state to true
  };

  const handleAddPriceClick = (rowId) => {
    setSelectedRowId(rowId); // Set selectedRowId when Add Price button is clicked
    setIsDialogOpen(true);
  };

  return (
    <div style={{ marginTop: "2rem", padding: "2rem" }}>
      <Data_Table columns={columns} rows={IndentMaterial} />
      <Add_Price_Form
        open={isDialogOpen}
        handleClose={handleCloseDialog}
        handleSave={handleSaveDialog}
      />
    </div>
  );
};

export default MaterialPricesTable;
