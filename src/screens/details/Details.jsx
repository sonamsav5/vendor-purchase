import * as React from "react";
import {
  Container,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import Profile from "../profile/Profile";
import "../../css/common/common.css";
import Tax_Form from "../tax_form/Tax_Form";
import Account_Form from "../account_form/Account_Form";
import Material from "../material/Material";
import { submit_action } from "../../action/profile_form_action/profile_form_action";
import { checkRefreshData } from "../../action/splash/splase_action";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate()
  const [updatedMaterialList, setUpdatedMaterialList] = useState([]);
  const [taxFormDetails, setTaxFormDetails] = useState({
    PanNumber: "",
    GST: "",
    CGST: "",
    IGST: "",
    SGST: "",
    PanCardUrl: "",
    UTGST: "",
    GSTUrl: "",
  });
  const [profileDetails, setProfileDetails] = useState({
    VendorName: "",
    EmailId: "",
    MobileNumber: "",
    Address: "",
    CountryId: "", //country
    StateId: "", //state
    CityId: "", //city
  });
  const [accountDetails, setAccountDetails] = useState({
    AccountHolderName: "",
    AccountNumber: "",
    BankId: "",
    IFSC: "",
    AccountTypeId: "",
    MICR: "",
    BankAddress: "",
    AccountUrl: "",
  });


  const handleNext = () => {
    if (activeStep === 0) handleEditProfile()
    if (activeStep === 1) handleEditTax()
    if (activeStep === 2) handleEditAccount()
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSubmit = async () => {
    handleEditCheckList()
    const res = await submit_action();
    if (res.IsSuccess) {
      navigate('/vendordashboard')
    }
    console.log(res)
  };
  useEffect(() => {
    checkRefreshData();
  }, []);


  const handleEditCheckList = () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, updatedMaterialList })
    );
  };

  const handleEditProfile = () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
    let temp = {
      ...user,
      ...profileDetails,
    };
    localStorage.setItem("user", JSON.stringify(temp));
  };
  const handleEditAccount = () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
    let temp = {
      ...user,
      ...accountDetails,
      AccountTypeId: accountDetails.AccountTypeId
    };
    localStorage.setItem("user", JSON.stringify(temp));
  };


  const handleEditTax = () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
    let temp = {
      ...user,
      ...taxFormDetails,
    };
    localStorage.setItem("user", JSON.stringify(temp));
  };



  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }


  return (
    <div
      style={{
        width: '100%',
        height: 'calc(100vh - 3rem)',
        border: '2px solid green',
        overflow: 'auto',
        position: "relative"
      }}
    >
      <Grid container height='100%' >
        <Grid height='100%' item xs={12} sx={{border:'2px solid red'}} >
          <Stepper
            className="custom-stepper"
            activeStep={activeStep}
            alternativeLabel
            sx={{margin: 'auto'}}
          >
            <Step>
              <StepLabel
                className="custom-stepper-label"
                sx={{
                  fontSize: "20px",

                  "& .MuiStepLabel-alternativeLabel": {
                    fontSize: "17px",
                    marginTop: '2px !important',
                    color: "#020043",
                  },
                }}
              >
                Profile
              </StepLabel>
            </Step>
            <Step>
              <StepLabel
                className="custom-stepper-label"
                sx={{
                  fontSize: "20px",

                  "& .MuiStepLabel-alternativeLabel": {
                    fontSize: "17px",
                    marginTop: '2px !important',
                    color: "#020043",
                  },
                }}
              >
                Tax
              </StepLabel>
            </Step>
            <Step>
              <StepLabel
                className="custom-stepper-label"
                sx={{
                  fontSize: "20px",

                  "& .MuiStepLabel-alternativeLabel": {
                    fontSize: "17px",
                    marginTop: '2px !important',
                    color: "#020043",
                  },
                }}
              >
                Account
              </StepLabel>
            </Step>
            <Step>
              <StepLabel
                className="custom-stepper-label"
                sx={{
                  fontSize: "20px",

                  "& .MuiStepLabel-alternativeLabel": {
                    fontSize: "17px",
                    marginTop: '2px !important',
                    color: "#020043",
                  },
                }}
              >
                Material
              </StepLabel>
            </Step>
          </Stepper>

          {activeStep === 0 && (
            <div>
              <Profile
                profileDetails={profileDetails}
                setProfileDetails={setProfileDetails}
              />
            </div>
          )}
          {activeStep === 1 && (
            <div>
              <Tax_Form
                taxFormDetails={taxFormDetails}
                setTaxFormDetails={setTaxFormDetails}
              />
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <Account_Form
                accountDetails={accountDetails}
                setAccountDetails={setAccountDetails} />
            </div>
          )}
          {activeStep === 3 && (
            <div>
              <Material
                setUpdatedMaterialList={setUpdatedMaterialList}
                updatedMaterialList={updatedMaterialList} />
            </div>
          )}
          <Box sx={{
            width: '100%',
            position: 'fixed',
            marginLeft: '100px',
            border: '3px solid pink',
            bottom: 0,
            left: 0,
            background:'white'
          }}>
            <Box
              sx={{
                //position: 'absolute',
                maxWidth: "1200px",
                width: "1200px",
                margin: 'auto',
                border: '1px solid red',
                bottom: 0,
                left: 0,
                paddingX: "1rem",
                paddingY: '1rem'
              }}>
              {
                activeStep > 0 ?
                  <Button
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    color="error"
                  >
                    Back
                  </Button>
                  : ''
              }
              {
                activeStep < 3 ?
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{
                      backgroundColor: "#020043",
                      color: "#FFD500",
                      padding: "5px 10px",
                      marginLeft: "1rem",
                      cursor: "pointer",
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
                    Next
                  </Button>
                  : ''
              }
              {
                activeStep === 3 ?
                  <Button
                    onClick={handleSubmit}
                    color="success"
                    variant="contained"
                    sx={{
                      marginLeft: "1rem",
                    }}
                  >
                    {" "}
                    submit
                  </Button>
                  : ''
              }
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
