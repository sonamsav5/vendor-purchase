import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Card, Divider } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch"; //for enquirey
import TaskIcon from "@mui/icons-material/Task"; //second card
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault"; //third

import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";
import PhonelinkEraseIcon from "@mui/icons-material/PhonelinkErase"; //fourth
import DomainVerificationIcon from "@mui/icons-material/DomainVerification"; //fifth
import PendingActionsIcon from "@mui/icons-material/PendingActions"; //pending
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle"; ///last

import HourglassTopSharpIcon from "@mui/icons-material/HourglassTopSharp";
import DownloadingSharpIcon from "@mui/icons-material/DownloadingSharp";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import Data_Table from "../../../../component/data_table/Data_Table";
import { material_columns } from "../material_table/material_columns";
import { material_rows } from "../material_table/material_rows";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        marginTop: "2rem",
        // padding: "0.2rem",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={
          {
            // marginTop: "2rem",
          }
        }
      >
        <Grid item xs={12} md={12} lg={8}>
          <Card
            sx={{
              padding: "5px",
              marginTop: "1rem",
              boxShadow:
                "0px 3px 3px -1px gray, 0px 3px 1px 1px gray, 0px 3px 3px 2px gray",
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "4px",
              },
            }}
          >
            <Typography
              sx={{
                // textAlign: "center",
                marginTop: "1rem",
                fontWeight: "600",
                fontSize: "20px",
                color: "#7876b4",
                fontFamily: "Robot, sans-serif",
                textAlign: "center",
              }}
            >
              Vendor Material Record
            </Typography>
            {/* Row 1 */}

            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                marginTop: "1rem",
                padding: "4px",
              }}
            >
              <Grid item xs={12} sm={3} md={2} lg={1}>
                <ContentPasteSearchIcon
                  sx={{
                    fontSize: { xs: "30px", md: "35px" },
                    color: "#3f3bac",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={9} md={4} lg={4}>
                <Typography
                  // variant="h6"
                  // fontWeight="600"
                  textAlign="center"
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: "16px",
                    color: "gray",
                    fontFamily: "Robot, sans-serif",
                  }}
                >
                  Enquiry Received For Material
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Typography
                  // variant="h6"
                  // fontWeight="bold"
                  textAlign="center"
                  sx={{
                    whiteSpace: "nowrap",
                    width: "100px",
                    borderRadius: "30px",
                    border: "1px solid #b1afeb",
                    backgroundColor: "#dedded",
                    color: "#020043",
                  }}
                >
                  2
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={1}>
                <ArrowForwardIosIcon />
              </Grid>
            </Grid>
            <Divider />
            {/* Row 2 */}
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                padding: "4px",
              }}
            >
              <Grid item xs={12} sm={3} md={2} lg={1}>
                <TaskIcon
                  sx={{
                    fontSize: { xs: "30px", md: "35px" },
                    color: "rgb(24, 194, 80)",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={9} md={4} lg={4}>
                <Typography
                  // variant="h6"
                  // fontWeight="bold"
                  textAlign="center"
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: "16px",
                    color: "gray",
                    fontFamily: "Robot, sans-serif",
                  }}
                >
                  Submitted Quotation
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Typography
                  textAlign="center"
                  sx={{
                    whiteSpace: "nowrap",

                    width: "100px",
                    borderRadius: "30px",

                    border: "1px solid rgb(159, 239, 186)",
                    backgroundColor: "rgb(198, 234, 210)",
                    color: "green",
                  }}
                >
                  5
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={1}>
                <ArrowForwardIosIcon />
              </Grid>
            </Grid>
            <Divider />
            {/* Row 3 */}
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                padding: "4px",
              }}
            >
              <Grid item xs={12} sm={3} md={2} lg={1}>
                <DisabledByDefaultIcon
                  sx={{
                    fontSize: { xs: "30px", md: "35px" },
                    color: "#E17127",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={9} md={4} lg={4}>
                <Typography
                  textAlign="center"
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: "16px",
                    color: "gray",
                    fontFamily: "Robot, sans-serif",
                  }}
                >
                  Rejected Quotation
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Typography
                  textAlign="center"
                  sx={{
                    whiteSpace: "nowrap",

                    width: "100px",
                    borderRadius: "30px",

                    border: "1px solid #E17127",
                    backgroundColor: "#f3d1ba",
                    color: "#E17127",
                  }}
                >
                  1
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={1}>
                <ArrowForwardIosIcon
                  sx={{
                    cursor: "pointer",
                    // dashboardData[0]?.HrrApproved > 0 ? "pointer" : "default",
                  }}
                />
              </Grid>
            </Grid>
            <Divider />
            {/* Row 4 */}
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                padding: "4px",
              }}
            >
              <Grid item xs={12} sm={3} md={2} lg={1}>
                <PhonelinkEraseIcon
                  sx={{
                    fontSize: { xs: "30px", md: "35px" },
                    color: "rgb(239, 125, 125)",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={9} md={4} lg={4}>
                <Typography
                  textAlign="center"
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: "16px",
                    color: "gray",
                    fontFamily: "Robot, sans-serif",
                  }}
                >
                  Self Rejected Enquiry
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Typography
                  // variant="h6"
                  textAlign="center"
                  sx={{
                    whiteSpace: "nowrap",

                    width: "100px",
                    borderRadius: "30px",
                    border: "2px solid rgb(239, 125, 125)",
                    backgroundColor: "rgb(232, 192, 192)",
                    color: "red",
                  }}
                >
                  2
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={1}>
                <ArrowForwardIosIcon
                  sx={{
                    cursor: "pointer",
                    // dashboardData[0]?.TimeOut > 0 ? "pointer" : "default",
                  }}
                />
              </Grid>
            </Grid>
            <Divider />
            {/* Row 5 */}
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                padding: "4px",
              }}
            >
              <Grid item xs={12} sm={3} md={2} lg={1}>
                <DomainVerificationIcon
                  sx={{
                    fontSize: { xs: "30px", md: "35px" },
                    color: "rgb(243, 216, 106)",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={9} md={4} lg={4}>
                <Typography
                  textAlign="center"
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: "16px",
                    color: "gray",
                    fontFamily: "Robot, sans-serif",
                  }}
                >
                  Order Received{" "}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Typography
                  // variant="h6"
                  textAlign="center"
                  sx={{
                    whiteSpace: "nowrap",

                    width: "100px",
                    borderRadius: "30px",
                    border: "2px solid rgb(237, 228, 186)",
                    backgroundColor: "rgb(234, 227, 197)",
                    color: "orange",
                  }}
                >
                  2
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={1}>
                <ArrowForwardIosIcon
                  sx={{
                    cursor: "pointer",
                    // dashboardData[0]?.TimeOut > 0 ? "pointer" : "default",
                  }}
                />
              </Grid>
            </Grid>
            <Divider />
            {/* Row 6 */}
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                padding: "4px",
              }}
            >
              <Grid item xs={12} sm={3} md={2} lg={1}>
                <AirportShuttleIcon
                  sx={{
                    fontSize: { xs: "30px", md: "35px" },
                    color: "rgb(42, 157, 50)",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={9} md={4} lg={4}>
                <Typography
                  textAlign="center"
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: "16px",
                    color: "gray",
                    fontFamily: "Robot, sans-serif",
                  }}
                >
                  Order Delivered
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Typography
                  // variant="h6"
                  textAlign="center"
                  sx={{
                    whiteSpace: "nowrap",

                    width: "100px",
                    borderRadius: "30px",
                    border: "2px solid rgb(171, 231, 176)",
                    backgroundColor: "rgb(209, 243, 212)",
                    color: "green",
                  }}
                >
                  2
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={1}>
                <ArrowForwardIosIcon
                  sx={{
                    cursor: "pointer",
                    // dashboardData[0]?.TimeOut > 0 ? "pointer" : "default",
                  }}
                />
              </Grid>
            </Grid>
            <Divider />
            {/* Row 7 */}
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                padding: "4px",
              }}
            >
              <Grid item xs={12} sm={3} md={2} lg={1}>
                <PendingActionsIcon
                  sx={{
                    fontSize: { xs: "30px", md: "35px" },
                    color: "rgb(191, 121, 16)",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={9} md={4} lg={4}>
                <Typography
                  textAlign="center"
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: "16px",
                    color: "gray",
                    fontFamily: "Robot, sans-serif",
                  }}
                >
                  Payment Pending
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Typography
                  // variant="h6"
                  textAlign="center"
                  sx={{
                    whiteSpace: "nowrap",

                    width: "100px",
                    borderRadius: "30px",
                    border: "2px solid rgb(239, 202, 146)",
                    backgroundColor: "rgb(231, 208, 174)",
                    color: "rgb(159, 113, 43)",
                  }}
                >
                  2
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={1}>
                <ArrowForwardIosIcon
                  sx={{
                    cursor: "pointer",
                    // dashboardData[0]?.TimeOut > 0 ? "pointer" : "default",
                  }}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Card
            sx={{
              height: "60vh",
              overflow: "auto",
              marginTop: "1rem",

              boxShadow:
                "0px 5px 5px -11px gray, 0px 3px 1px 1px rgba(0, 0, 0, 0.14), 0px 3px 4px 2px gray",

              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "4px",
              },
            }}
          >
            <Notification />
          </Card>
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <Data_Table columns={material_columns} rows={material_rows} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
