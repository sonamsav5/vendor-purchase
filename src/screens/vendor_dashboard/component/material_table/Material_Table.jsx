import React, { useState, useEffect } from "react";
import { material_columns } from "./material_columns";
import Data_Table from "../../../../component/data_table/Data_Table";
import { material_rows } from "./material_rows";
import { Button, Card, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { postRequestWithAuthentication } from "../../../../service/base_client";

const handleMaterialAction = async (flag) => {
  try {
    const response = await postRequestWithAuthentication(
      "Purchase/AddIndentMaterialCost",
      {
        IndentMaterialDetails: "string",
        IndentId: 0,
        Flag: flag,
      }
    );

    if (response.status === true) {
      return true;
    } else {
      console.error(
        `Error ${flag === "accept" ? "accepting" : "rejecting"} material:`,
        response.error
      );
      return false;
    }
  } catch (error) {
    console.error(
      `Network error while ${
        flag === "accept" ? "accepting" : "rejecting"
      } material:`,
      error
    );
    return false;
  }
};

const Material_Table = () => {
  const [showAcceptRejectButtons, setShowAcceptRejectButtons] = useState(true);
  const [extendedColumns, setExtendedColumns] = useState(material_columns);
  const [extendedRows, setExtendedRows] = useState(material_rows);
  const [subTotal, setSubTotal] = useState("");
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const handleRejectClick = async () => {
    const rejectSuccess = await handleMaterialAction("Reject");
    if (rejectSuccess) {
      navigate("/vendordashboard");
    } else {
    }
  };

  const handleAcceptClick = async () => {
    const acceptSuccess = await handleMaterialAction("accept");

    if (acceptSuccess) {
      const newColumns = [
        ...extendedColumns,
        { field: "price", headerName: "Price", width: 90 },
        { field: "gst", headerName: "GST", width: 90 },
        { field: "cgst", headerName: "CGST", width: 90 },
        { field: "sgst", headerName: "SGST", width: 90 },
        { field: "igst", headerName: "IGST", width: 90 },
        { field: "disc", headerName: "Disc (%)", width: 100 },
        {
          field: "totalMaterialCost",
          headerName: "Total Material Cost",
          width: 200,
        },
      ];

      const newRows = extendedRows.map((row) => {
        const randomPrice = Math.floor(Math.random() * 100) + 1;
        const gstValues = [5, 12, 18, 28];
        const randomGST =
          gstValues[Math.floor(Math.random() * gstValues.length)];
        const cgstPercentage = randomGST / 2;
        const sgstPercentage = randomGST / 2;
        const discountPercentage = Math.floor(Math.random() * 100);

        const cgst = (cgstPercentage / 100) * randomPrice;
        const sgst = (sgstPercentage / 100) * randomPrice;
        const totalMaterialCost = row.Qty * randomPrice + cgst + sgst;

        return {
          ...row,
          price: randomPrice,
          disc: `${discountPercentage}%`,
          gst: `${randomGST}%`,
          cgst: cgst.toFixed(2),
          sgst: sgst.toFixed(2),
          igst: "0.00",
          totalMaterialCost: totalMaterialCost.toFixed(2),
        };
      });

      const subtotal = newRows.reduce(
        (sum, row) => sum + parseFloat(row.totalMaterialCost),
        0
      );

      setExtendedColumns(newColumns);
      setExtendedRows(newRows);
      setSubTotal(subtotal.toFixed(2));
      setShowAcceptRejectButtons(false);
      setAccepted(true);
    } else {
      // Handle acceptance failure
    }
  };

  const handleSubmitClick = async () => {
    const submitSuccess = await handleMaterialAction("submit");
    if (submitSuccess) {
      navigate("/vendordashboard");
    } else {
      // Handle submission failure
    }
  };
  useEffect(() => {
    handleSubmitClick();
    handleRejectClick();
    handleAcceptClick();
    try {
      const storedColumns = localStorage.getItem("extendedColumns");
      const storedRows = localStorage.getItem("extendedRows");

      if (storedColumns && storedRows) {
        setExtendedColumns(JSON.parse(storedColumns));
        setExtendedRows(JSON.parse(storedRows));
        setShowAcceptRejectButtons(false);
      }
    } catch (error) {
      console.error("Error while retrieving data from local storage:", error);
    }
  }, []);

  return (
    <div style={{ marginTop: "3rem", position: "relative" }}>
      <Grid container>
        <Button
          variant="contained"
          color="success"
          onClick={handleAcceptClick}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: showAcceptRejectButtons ? "block" : "none",
          }}
        >
          Accept
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleRejectClick}
          sx={{
            position: "absolute",
            top: "1rem",
            right: "8rem",
            display: showAcceptRejectButtons ? "block" : "none",
            cursor: "pointer",
          }}
        >
          Reject
        </Button>

        <Grid item xs={4}>
          <Card sx={{ padding: "1rem" }}>
            <span
              style={{
                fontWeight: "600",
                color: "#020043",
              }}
            >
              Company Name :
            </span>{" "}
            Rishabraj
          </Card>
        </Grid>
        {accepted && (
          <div
            style={{
              display: "flex",
              border: "1px solid white",
              marginLeft: "auto",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                // padding: "1rem",
                marginLeft: "1rem",
              }}
            >
              <TextField
                label="Sub Total"
                type="number"
                value={subTotal}
                disabled
              />
            </Grid>
          </div>
        )}

        <Grid
          item
          xs={12}
          sx={{
            padding: "1rem",
          }}
        >
          <Data_Table columns={extendedColumns} rows={extendedRows} />
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            padding: "1rem",
            marginLeft: "1rem",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: "0.2rem",
              width: "160px",
              backgroundColor: "#020043",
              color: "#FFD500",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
              display: accepted ? "block" : "none",
              marginLeft: "auto",
              marginRight: "auto",

              "&:focus": {
                color: "#FFD500",
                backgroundColor: "#020043",
              },
              "&:hover": {
                color: "#FFD500",
                backgroundColor: "#020043",
              },
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Material_Table;
