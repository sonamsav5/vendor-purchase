import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getRequestWithAuthentication } from "../../../service/base_client";
import images from "../../../utils/images/common/image_map";
import Data_Table from "../../../component/data_table/Data_Table";
import { material_columns } from "./material_table/material_columns";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const Enquiry_Material = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [brokerTableData, setBrokerTableData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMoreClick = (event, rowData) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMoreOptions = () => {
    setAnchorEl(null);
  };

  const handleViewClick = (rowData) => {
    navigate("/enquiry-material-details", { state: rowData });
  };

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

  useEffect(() => {
    getMaterialData();
  }, []);

  return (
    <div style={{ marginTop: "4rem" }}>
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

      <div className="broker-table" style={{ height: "600px" }}>
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
                        className="upload-button"
                        style={{
                          cursor: "pointer",
                          color: "green",
                        }}
                      >
                        <RemoveRedEyeIcon />
                      </div>
                    )}

                    <div
                      className="more-button"
                      style={{ cursor: "pointer", color: "orange" }}
                    >
                      <MoreVertIcon
                        onClick={(e) => handleMoreClick(e, params.row)}
                      />
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMoreOptions}
                      >
                        <MenuItem
                          onClick={() => handleViewClick(params.row)}
                          sx={{
                            color: "orange",
                            fontSize: "17px",
                          }}
                        >
                          View
                        </MenuItem>
                        {/* Add other menu items as needed */}
                      </Menu>
                    </div>
                  </div>
                ),
              },
              ...material_columns,
            ]}
            rows={brokerTableData}
          />
        )}
      </div>
    </div>
  );
};

export default Enquiry_Material;
