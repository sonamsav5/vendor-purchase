import React, { useState, useEffect } from "react";
import {
  Typography,
  Drawer,
  Tab,
  Tabs,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
  Container,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getRequestWithAuthentication } from "../../../service/base_client";
import images from "../../../utils/images/common/image_map";
import Data_Table from "../../../component/data_table/Data_Table";
import { material_columns } from "./material_table/material_columns";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';


const Enquiry_Material = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [brokerTableData, setBrokerTableData] = useState([]);

  const getMaterialData = async () => {
    try {
      setLoading(true);

      let url = "Purchase/PullIndentByVendorId";
      const queryParams = new URLSearchParams({
        flag: location.state.flag,
      });

      url += `?${queryParams.toString()}`;

      const response = await getRequestWithAuthentication(url);

      if (response.status) {
        const brokerTableDataWithIds = response.data.map((row, index) => ({
          ...row,
          id: index + 1,
          loading: false,
        }));
        setBrokerTableData(brokerTableDataWithIds);
      } else {
        console.error("Error:", response.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (rowData) => {
    if (rowData.Type === "Material") {
      navigate("/materialList", { state: rowData.IndentMaterial });
    }
  };

  useEffect(() => {
    getMaterialData();
  }, []);
  // console.log("vfv f vf",brokerTableData)
  return (
    <Container maxWidth="lg" style={{ padding: "0.1rem" }}>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "600",
          marginLeft: "4rem",
          padding: "1rem",
        }}
      >
        {location.state.title}
      </Typography>

      <div
        className="broker-table"
        id="brokerDataTable"
        style={{ height: "600px" }}
      >
        {loading ? (
          <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img src={images.pending} width={100} height={100} />
          </Box>
        ) : (
          <Data_Table
            columns={[
              {
                field: "action",
                headerName: "Action",
                width: 110,
                renderCell: (params) => (
                  <div className="action-buttons" style={{ display: "flex" }}>
                    {location.state.flag === "ERFQ" && (
                      <div
                        className="view-button"
                        style={{ cursor: "pointer", color: "green" }}
                        onClick={() => handleViewClick(params.row)}
                      >
                        <RemoveRedEyeIcon />
                      </div>
                    )}
                    {location.state.flag === "SQ" && (
                      <div
                        className="view-button"
                        style={{ cursor: "pointer", color: "green" }}
                        onClick={() => handleViewClick(params.row)}
                      >
                        <CheckCircleOutlineIcon />
                      </div>
                    )}
                    {location.state.flag === "RQ" && (
                      <div
                        className="view-button"
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => handleViewClick(params.row)}
                      >
                        <CloseIcon />
                      </div>
                    )}
                  </div>
                ),
              },
              ...material_columns,
            ]}
            rows={brokerTableData}
          />
        )}
      </div>
    </Container>
  );
};

export default Enquiry_Material;
