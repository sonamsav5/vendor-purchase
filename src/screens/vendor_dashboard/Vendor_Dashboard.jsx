import React, { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";

//
import {
  Container,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Box,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import images from "../../utils/images/common/image_map";
import { getRequestWithAuthentication } from "../../service/base_client";
const initialVendorData = [
  {
    title: "Enquiry Received For Material",
    urls: "ERFQ",
    imageSrc: images.re,
    actionCount: 1,
    description: "Description for Enquiry Received For Material",
  },
  {
    title: "Submitted Quotation",
    urls: "SQ",
    imageSrc: images.quotation,
    actionCount: 1,
    description: "Description for Submitted Quotation",
  },
  {
    title: "Rejected Quotation",
    urls: "RQ",
    imageSrc: images.selfrejected,
    actionCount: 1,
    description: "Description for Rejected Quotation",
  },
  {
    title: "Self Rejected Quotation",
    urls: "SRQ",
    imageSrc: images.selfrejected,
    actionCount: 0,
    description: "Description for Self Rejected Enquiry",
  },
  {
    title: "Order Received",
    urls: "OR",
    imageSrc: images.received,
    actionCount: 0,
    description: "Description for Order Received",
  },
  {
    title: "Order Delivered",
    urls: "OD",
    imageSrc: images.orderdelivered,
    actionCount: 0,
    description: "Description for Order Delivered",
  },
  {
    title: "Payment Pending",
    urls: "PP",
    imageSrc: images.pending,
    actionCount: 0,
    description: "Description for Payment Pending",
  },
];

const VendorDashbord = () => {
  const [loading, setLoading] = useState(false);

  const [dashboardData, setDashboardData] = useState(initialVendorData);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };
  var getAllData = async () => {
    setLoading(true);

    let url = "Purchase/VendorDashboard";
    var response = await getRequestWithAuthentication(url);
    console.log(response);
    if (response.status) {
      const updatedData = [...initialVendorData];

      updatedData[0]["actionCount"] = response.data[0].RequestForQuotation;
      updatedData[1]["actionCount"] = response.data[0].SubmittedQuotation;
      updatedData[2]["actionCount"] = response.data[0].RejectedQuotation;
      updatedData[3]["actionCount"] = response.data[0].SelfRejectedQuotation;
      updatedData[4]["actionCount"] = response.data[0].OrderReceived;
      updatedData[5]["actionCount"] = response.data[0].OrderDelivered;
      updatedData[6]["actionCount"] = response.data[0].PaymentPending;

      setDashboardData(updatedData);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      openSnackbar("Error", response.data);

      setLoading(false);
    }
  };

  useEffect(() => {
    // checkRefreshData();

    getAllData();
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: "2.3rem",
        padding: "9px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            {dashboardData.map((data, index) => (
              <Grid key={index} item xs={12} md={4} lg={4}>
                <Card
                  sx={{
                    height: "120px",
                    borderRadius: "13px",
                    background:
                      "linear-gradient(to right, white, #FBF8E6, #F7E3EE)",
                    //  backgroundColor: "rgb(255,255,255)",
                    transition: "transform 0.2s",
                    cursor: "pointer",
                    position: "relative",
                    boxShadow:
                      "0px 3px 3px -1px gray, 0px 3px 1px 1px gray, 0px 3px 3px 2px gray",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                    cursor: data.actionCount > 0 ? "pointer" : "default",
                  }}
                  onClick={() =>
                    data.actionCount > 0 &&
                    navigate("/enquiryMaterial", {
                      state: { flag: data.urls, title: data.title },
                    })
                  }
                >
                  <CardHeader
                    avatar={
                      <img
                        src={data.imageSrc}
                        style={{ height: "45px", width: "45px" }}
                      />
                    }
                    action={
                      <IconButton
                        sx={{
                          fontSize: "1.5rem",
                          position: "absolute",
                          height: "100px",
                          width: "100px",
                          background: "white",
                          top: "-30%",
                          right: "-10%",
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <Typography
                            sx={{
                              position: "absolute",
                              top: "45%",
                              left: "30%",
                              fontSize: 25,
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >
                            {data.actionCount}
                          </Typography>
                        </Box>
                      </IconButton>
                    }
                  />
                  <Typography
                    sx={{
                      fontWeight: "600",
                      ml: "1rem",
                    }}
                  >
                    {data.title}
                  </Typography>
                  <CardContent>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "12px",
                        color: "gray",
                      }}
                    >
                      {data.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={closeSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default VendorDashbord;
