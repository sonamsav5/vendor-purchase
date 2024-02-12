import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Data_Table from "../../component/data_table/Data_Table";
import { Button } from "@mui/material";
import { Constant } from "../../utils/constant/constant";
import axios from "axios";

const EnquiryMaterial = () => {
  const [IndentMaterial, setIndentMaterial] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("IndentMaterialDetails", "");
      formData.append("IndentId", 1);
      formData.append("Flag", "REJECT");
      formData.append("Transport", "");
      formData.append("Loading", "");
      formData.append("UnLoading", "");
      formData.append("ExpectedDelivery", "");
      formData.append("ExpectedPayment", "");
      formData.append("Attachment", "");
      formData.append("Attachment2", "");
      formData.append("TotalAmount", "");

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

      navigate("/vendordashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAcceptClick = () => {
    console.log(location.state);
    navigate("/materialPricesTable", {
      state: { materialData: location.state },
    });
  };
  const handleRejectClick = async () => {
    try {
      await handleSubmit("REJECT");
    } catch (error) {
      console.error("Error rejecting material:", error);
    }
  };

  const columns = [
    { field: "UOMName", headerName: "UOM Name", width: "150" },
    { field: "MaterialName", headerName: "Material Name", width: "150" },
    { field: "Quantity", headerName: "Quantity", width: "150" },
    { field: "DeliveryDate", headerName: "Delivery Date", width: "200" },
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex" }}>
            <div className="editButton">
              <Button
                variant="contained"
                color="success"
                onClick={handleAcceptClick}
              >
                Accept
              </Button>
            </div>
            <div style={{ marginLeft: "1rem" }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleRejectClick}
              >
                Reject
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (location?.state) {
      setIndentMaterial(
        location?.state?.map((item, idx) => ({ ...item, id: idx + 1 }))
      );
    }
  }, [location.state]);

  return (
    <div style={{ marginTop: "2rem", padding: "2rem" }}>
      <Data_Table columns={columns} rows={IndentMaterial} />
    </div>
  );
};

export default EnquiryMaterial;
