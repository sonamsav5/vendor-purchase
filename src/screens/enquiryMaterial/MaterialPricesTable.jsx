import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Data_Table from "../../component/data_table/Data_Table";
import { useLocation, useNavigate } from "react-router-dom";
import { Constant } from "../../utils/constant/constant";
import axios from "axios";
const MaterialPricesTable = () => {
  const location = useLocation();
  const [IndentMaterial, setIndentMaterial] = useState([]);
  const [transportation, setTransportation] = useState(0);
  const [loading, setLoading] = useState(0);
  const [unloading, setUnloading] = useState(0);
  const [deliveryDays, setDeliveryDays] = useState(0);
  const [paymentDays, setPaymentDays] = useState(0);
  const [priceTable, setPriceTable] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (location?.state) {
      setIndentMaterial(
        location?.state?.materialData?.map((item, idx) => ({
          ...item,
          id: idx + 1,
          rate: "",
          cgst: "",
          sgst: "",
          igst: "",
          discount: "",
          total: "",
        }))
      );
    }
  }, [location.state]);

  const handleFieldChange = (rowId, fieldName, value) => {
    const updatedRows = IndentMaterial.map((row) => {
      if (row.id === rowId) {
        return { ...row, [fieldName]: value };
      }
      return row;
    });

    // Calculate total and update the row
    const updatedRowsWithTotal = updatedRows.map((row) => {
      const { Quantity, rate, discount, cgst, sgst, igst } = row;
      const calculatedTotal = (
        Quantity * rate * (1 - discount / 100) +
        (cgst / 100) * (Quantity * rate) +
        (sgst / 100) * (Quantity * rate) +
        (igst / 100) * (Quantity * rate)
      ).toFixed(2); // Fixing to 2 decimal places
      return { ...row, total: calculatedTotal };
    });

    setIndentMaterial(updatedRowsWithTotal);
  };

  // Calculate Grand Total including Transportation, Loading, Unloading, Delivery Days, and Payment Days
  const grandTotal = (
    IndentMaterial.reduce((acc, curr) => {
      return acc + Number(curr.total);
    }, 0) +
    transportation +
    loading +
    unloading
  ).toFixed(2);

  const columns = [
    {
      field: "MaterialName",
      headerName: "Material Description",
      width: 200,
      renderCell: (params) => (
        <div>
          <div>{params.row.MaterialName}</div>
          <div>{params.row.MaterialSubtypeName}</div>
        </div>
      ),
    },
    { field: "DeliveryDate", headerName: "Delivery By", width: 100 },
    { field: "UOMName", headerName: "UOM", width: 100 },
    { field: "Quantity", headerName: "Quantity", width: 130 },
    {
      field: "rate",
      headerName: "Rate",
      width: 100,
      renderCell: (params) => (
        <TextField
          label="Enter"
          variant="standard"
          value={params.row.rate}
          onChange={(e) =>
            handleFieldChange(params.row.id, "rate", e.target.value)
          }
          fullWidth
        />
      ),
    },
    {
      field: "CGST",
      headerName: "CGST%",
      width: 90,
      renderCell: (params) => (
        <TextField
          label="Enter"
          variant="standard"
          value={params.row.cgst}
          onChange={(e) =>
            handleFieldChange(params.row.id, "cgst", e.target.value)
          }
          fullWidth
        />
      ),
    },
    {
      field: "SGST",
      headerName: "SGST%",
      width: 90,
      renderCell: (params) => (
        <TextField
          label="Enter"
          variant="standard"
          value={params.row.sgst}
          onChange={(e) =>
            handleFieldChange(params.row.id, "sgst", e.target.value)
          }
          fullWidth
        />
      ),
    },
    {
      field: "IGST",
      headerName: "IGST%",
      width: 90,
      renderCell: (params) => (
        <TextField
          label="Enter"
          variant="standard"
          value={params.row.igst}
          onChange={(e) =>
            handleFieldChange(params.row.id, "igst", e.target.value)
          }
          fullWidth
        />
      ),
    },
    {
      field: "Discount",
      headerName: "Disc%",
      width: 90,
      renderCell: (params) => (
        <TextField
          label="Enter"
          variant="standard"
          value={params.row.discount}
          onChange={(e) =>
            handleFieldChange(params.row.id, "discount", e.target.value)
          }
          fullWidth
        />
      ),
    },
    {
      field: "total",
      headerName: "Total",
      width: 150,
    },
  ];

  const handleSubmit = async () => {
    try {
      const indentMaterialDetails = IndentMaterial.map((row) => ({
        IndentMaterialId: row.id,
        IndentMaterialPrice: row.rate,
        CGST: row.cgst,
        SGST: row.sgst,
        IGST: 0,
        UGST: 0,
        Discount: 10,
      }));

      const formData = new FormData();
      formData.append(
        "IndentMaterialDetails",
        JSON.stringify(indentMaterialDetails)
      );

      formData.append("Flag", "ACCEPT");
      formData.append("Transport", transportation);
      formData.append("Loading", loading);
      formData.append("UnLoading", unloading);
      formData.append("ExpectedDelivery", deliveryDays);
      formData.append("ExpectedPayment", paymentDays);
      formData.append("Attachment", "");
      formData.append("Attachment2", "");
      formData.append("TotalAmount", grandTotal);

      const token = JSON.parse(localStorage.getItem("token"));

      const headers = {
        Accept: "application/json",
        "content-type": "multipart/form-data",
        apiKey: Constant.apiKey,
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `${Constant.baseUrl}/Purchase/AddIndentMaterialCost`,
        formData,
        { headers }
      );

      navigate("/vendordashboard", {
        state: { flag: "SQ", title: "Submitted Quotation" },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("sdvnjv", IndentMaterial);
  return (
    <Container
      maxWidth="lg"
      sx={{ marginTop: "1rem", padding: "1rem", width: "100%" }}
    >
      <Data_Table columns={columns} rows={IndentMaterial} />
      <Card
        sx={{
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={2}>
            <TextField
              label="Transportation"
              variant="outlined"
              value={transportation}
              onChange={(e) => setTransportation(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Loading"
              variant="outlined"
              value={loading}
              onChange={(e) => setLoading(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Unloading"
              variant="outlined"
              value={unloading}
              onChange={(e) => setUnloading(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Expected Delivery in days"
              variant="outlined"
              value={deliveryDays}
              onChange={(e) => setDeliveryDays(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Expected Payment in days"
              variant="outlined"
              value={paymentDays}
              onChange={(e) => setPaymentDays(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Grand Total"
              variant="outlined"
              value={grandTotal}
              disabled
            />
          </Grid>

          <Grid>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                marginTop: "1rem",
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default MaterialPricesTable;
