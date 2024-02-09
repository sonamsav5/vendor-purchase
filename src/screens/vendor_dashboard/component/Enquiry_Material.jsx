import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useNavigate } from "react-router-dom";
import Data_Table from "../../../component/data_table/Data_Table";
import { enquiryColumn } from "./material_table/enquiry_column/enquiry_column";
const rowsData = [
  {
    id: 1,
    companyName: "Material 1",
    Type: "SubMaterial 1",
    role: "UOM1",
    Qty: 10,
  },
  {
    id: 2,
    companyName: "Material 1",
    Type: "SubMaterial 1",
    role: "UOM1",
    Qty: 10,
  },
  {
    id: 3,
    companyName: "Material 1",
    Type: "SubMaterial 1",
    role: "UOM1",
    Qty: 10,
  },
  {
    id: 4,
    companyName: "Material 1",
    Type: "SubMaterial 1",
    role: "UOM1",
    Qty: 10,
  },
  {
    id: 5,
    companyName: "Material 1",
    Type: "SubMaterial 1",
    role: "UOM1",
    Qty: 10,
  },
  {
    id: 6,
    companyName: "Material 1",
    Type: "SubMaterial 1",
    role: "UOM1",
    Qty: 10,
  },
  {
    id: 7,
    companyName: "Material 1",
    Type: "SubMaterial 1",
    role: "UOM1",
    Qty: 10,
  },
  {
    id: 8,
    companyName: "Material 1",
    Type: "SubMaterial 1",
    role: "UOM1",
    Qty: 10,
  },
];

const Enquiry_Material = () => {
  const navigate = useNavigate();

  const handleViewClick = (rowData) => {
    navigate("/materialtable");
  };

  return (
    <Container
      sx={{
        marginTop: "1rem",
        padding: "1rem",
      }}
    >
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        Enquiry Material
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: "1rem",
        }}
      >
        <Grid item xs={12}>
          <Data_Table
            columns={enquiryColumn(handleViewClick)}
            rows={rowsData}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Enquiry_Material;
