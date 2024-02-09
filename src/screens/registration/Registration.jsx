import React, { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import "../../css/login/login.css";

import {
  Alert,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Snackbar,
  Typography,
} from "@mui/material";

import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import OTPInput from "react-otp-input";
import images from "../../utils/images/common/image_map";
import {
  registerApi,
  sendEmailOTP,
  sendPhoneOTP,
} from "../../action/register/register_action";
import { verifyOTP } from "../../action/home/home_action";

const vendorType = ["Contractor", "Supplier"];

const Registration = () => {
  const navigate = useNavigate();
  const initialRegistrationForm = {
    vendorName: "",
    companyName: "",
    emailId: "",
    phoneNumber: "",
    vendor: "",
  };
  const [registrationForm, setRegistrationForm] = useState(
    initialRegistrationForm
  );

  const [EmailId, setEmailId] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [sentPhoneOtp, setSentPhoneOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [sentEmailOtp, setSentEmailOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [userType, setUserType] = useState([]);
  const [checked, setChecked] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [openPhoneDialog, setOpenPhoneDialog] = useState(false);

  const [disableEmail, setDisableEmail] = useState(false);
  const [emailDialogtext, setemailDialogtext] = useState(false);

  const [disablePhoneNo, setDisablePhoneNo] = useState(false);
  const [PhoneNoDialogtext, setPhoneNoDialogtext] = useState(false);

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleLoginClick = () => {
    setOpenDialog(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    setRegistrationForm({
      ...registrationForm,
      [name]: value,
    });

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: hasSpecialChars ? "Special characters not allowed." : "",
    }));
  };

  // This is field validation
  const requiredFields = [
    "vendorName",
    "companyName",
    "emailId",
    "phoneNumber",
    "vendorType",
  ];

  const areAllFieldsFilled = () => {
    for (const field of requiredFields) {
      if (
        !registrationForm[field] &&
        PhoneNoDialogtext &&
        emailDialogtext &&
        checked
      ) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var payload = {
      VendorName: registrationForm.vendorName,
      VendorType: registrationForm.VendorTypeId === "Supplier" ? 1 : 2,
      CompanyName: registrationForm.companyName,
      EmailId: EmailId,
      MobileNumber: PhoneNo,
      userType: registrationForm.vendor,
      DeviceToken: "WEB",
    };
    var response = await registerApi(payload);
    console.log(response);
    if (response !== "") {
      navigate("/", { replace: true });
    }
  };

  const handleEmailId = (e) => {
    setEmailId(e.target.value);
    // Clear email validation error when typing
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      emailId: "",
    }));
  };

  const handlePhoneNumber = (e) => {
    const phoneNumber = e.target.value;

    const isValidPhoneNumber = /^\d+$/;

    if (!isValidPhoneNumber.test(phoneNumber)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Phone number can only contain digits.",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "",
      }));
      setPhoneNo(phoneNumber);
    }
  };

  const handleOpenEmailDialog = async (e) => {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!EmailId.match(isValidEmail)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        emailId: "Invalid email format.",
      }));
      return;
    }
    setOpenEmailDialog(true);
    const response = await sendEmailOTP(EmailId);
    console.log(response);
    if (response !== "") {
      setOpenEmailDialog(true);
      setSentEmailOtp(response);
    }
  };

  const handleCloseEmailDialog = () => {
    setOpenEmailDialog(false);
  };

  const handleClosePhoneNoDialog = () => {
    setOpenPhoneDialog(false);
  };

  const handleOpenPhoneDialog = async () => {
    if (PhoneNo.length !== 10) {
      // Show Error
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Phone number must be 10 digits.",
      }));
      return;
    }

    const response = await sendPhoneOTP(PhoneNo);
    console.log(response);
    if (response !== "") {
      setOpenPhoneDialog(true);
      setSentPhoneOtp(response);
    }
  };

  const handleClosePhoneDialog = () => {
    setOpenPhoneDialog(false);
  };

  const handleEmailVerification = () => {
    if (verifyOTP(emailOtp, sentEmailOtp)) {
      handleCloseEmailDialog();
      handleDisableEmail();
      //Error Message
    } else {
      // Handle error case
    }
  };

  const handleDisableEmail = () => {
    setDisableEmail(true);
    handleEmailDialogText();
  };

  const handleEmailDialogText = () => {
    setemailDialogtext(true);
  };

  const handlePhoneNoVerification = () => {
    if (verifyOTP(phoneOtp, sentPhoneOtp)) {
      handleClosePhoneNoDialog();
      handleDisablePhoneNo();
      //Error Message
    } else {
      // Handle error case
    }
  };

  const handleDisablePhoneNo = () => {
    setDisablePhoneNo(true);
    handlePhoneNoDialogText();
  };

  const handlePhoneNoDialogText = () => {
    setPhoneNoDialogtext(true);
  };

  useEffect(() => {
    var tempList = JSON.parse(localStorage.getItem("userType"));
    setUserType(tempList);
  }, []);

  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: "1rem",
        }}
      >
        <div className="register-container">
          <MenuIcon className="square" />
          <div className="form">
            <div className="register-info">
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "30px",
                  color: "#020043",
                }}
              >
                WELCOME TO PURCHASE!
              </Typography>
              <img
                src={images.loginimg}
                style={{
                  width: "350px",
                  height: "350px",
                  marginTop: "2.2rem",
                }}
              />
            </div>

            <div className="register-form">
              <span className="circles one"></span>
              <span className="circles two"></span>

              <form action="index.html" autoComplete="off">
                <h3
                  className="register-title"
                  style={{
                    marginTop: "1rem",
                    color: "#020043",
                    fontWeight: "600",
                  }}
                >
                  Registration Form
                </h3>
                <Grid register-container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Vendor Name"
                      name="vendorName"
                      variant="outlined"
                      value={registrationForm.vendorName}
                      onChange={handleChange}
                      error={!!formErrors.vendorName}
                      helperText={formErrors.vendorName}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      required
                      label="Company Name"
                      name="companyName"
                      variant="outlined"
                      value={registrationForm.companyName}
                      onChange={handleChange}
                      error={!!formErrors.companyName}
                      helperText={formErrors.companyName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!formErrors.emailId}
                    >
                      <InputLabel>Email ID</InputLabel>
                      <OutlinedInput
                        value={EmailId}
                        onChange={handleEmailId}
                        disabled={disableEmail}
                        endAdornment={
                          <InputAdornment position="end">
                            <Typography
                              onClick={handleOpenEmailDialog}
                              style={{
                                fontSize: "14px",
                                cursor: "pointer",
                              }}
                            >
                              {emailDialogtext ? "Verified" : "Verify Email"}
                            </Typography>
                          </InputAdornment>
                        }
                        label="EMAIL ID"
                      />
                      {formErrors.emailId && (
                        <FormHelperText>{formErrors.emailId}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!formErrors.phoneNumber}
                    >
                      <InputLabel>Phone Number</InputLabel>
                      <OutlinedInput
                        value={PhoneNo}
                        onChange={handlePhoneNumber}
                        disabled={disablePhoneNo}
                        endAdornment={
                          <InputAdornment position="end">
                            <Typography
                              onClick={handleOpenPhoneDialog}
                              style={{
                                fontSize: "14px",
                                cursor: "pointer",
                              }}
                            >
                              {PhoneNoDialogtext
                                ? "Verified"
                                : "Verify Phone number"}
                            </Typography>
                          </InputAdornment>
                        }
                        label="Phone Number"
                        inputProps={{ maxLength: 10 }}
                      />
                      {formErrors.phoneNumber && (
                        <FormHelperText>
                          {formErrors.phoneNumber}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <Grid item xs={12}>
                      <TextField
                        select
                        fullWidth
                        required
                        margin="normal"
                        label="Vendor Type"
                        name="vendor"
                        variant="outlined"
                        value={registrationForm.vendor}
                        onChange={handleChange}
                      >
                        {vendorType.map((option, index) => (
                          <MenuItem key={index} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    {/* Email verification dialog */}
                    <Dialog
                      open={openEmailDialog}
                      onClose={handleCloseEmailDialog}
                    >
                      <DialogTitle>Enter Email Verfication Code </DialogTitle>
                      <DialogContent>
                        <OTPInput
                          value={emailOtp}
                          onChange={setEmailOtp}
                          numInputs={6}
                          renderSeparator={<span>-</span>}
                          renderInput={(props, index) => (
                            <input
                              {...props}
                              style={{
                                width: "50px",
                                height: "40px",
                                textAlign: "center",
                              }}
                              maxLength="1"
                              type="text"
                              inputMode="text"
                              autoComplete="off"
                            />
                          )}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleCloseEmailDialog}
                          color="primary"
                        >
                          Close
                        </Button>
                        <Button
                          onClick={handleEmailVerification}
                          color="primary"
                        >
                          Verify
                        </Button>
                      </DialogActions>
                    </Dialog>

                    {/* Phone number verification dialog  */}
                    <Dialog
                      open={openPhoneDialog}
                      onClose={handleClosePhoneDialog}
                    >
                      <DialogTitle>Phone Number Verification</DialogTitle>
                      <DialogContent>
                        <OTPInput
                          value={phoneOtp}
                          onChange={setPhoneOtp}
                          numInputs={6}
                          renderSeparator={<span>-</span>}
                          renderInput={(props, index) => (
                            <input
                              {...props}
                              style={{
                                width: "50px",
                                height: "40px",
                                textAlign: "center",
                              }}
                              maxLength="1"
                              type="text"
                              inputMode="text"
                              autoComplete="off"
                            />
                          )}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleClosePhoneDialog}
                          color="primary"
                        >
                          Close
                        </Button>
                        <Button
                          onClick={handlePhoneNoVerification}
                          color="primary"
                        >
                          Verify
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>

                  <Checkbox
                    checked={checked}
                    onChange={handleChecked}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{
                      marginLeft: "3rem",
                    }}
                    error={!!formErrors.checkbox}
                    helperText={formErrors.checkbox}
                  />

                  <span
                    style={{
                      fontSize: "12px",
                      color: "gray",
                    }}
                  >
                    I’ve read and agreed to Terms & Conditions
                  </span>

                  <Grid item xs={12}>
                    <button
                      style={{
                        marginTop: "1rem",
                        backgroundColor: "#020043",
                        color: "#FFD500",
                        fontWeight: "600",
                        fontSize: "15px",
                        cursor: "pointer",
                        "&:focus": {
                          color: "#FFD500",
                          backgroundColor: "#5552bd",
                        },
                        "&:hover": {
                          color: "#FFD500",
                          backgroundColor: "#5552bd",
                        },
                      }}
                      onClick={handleSubmit}
                      disabled={!areAllFieldsFilled()}
                      className="btn"
                    >
                      Register
                    </button>

                    <Typography
                      sx={{
                        textAlign: "center",
                        color: "#020043",
                        marginTop: "1rem",
                      }}
                    >
                      Already have an account ?
                      <Link to="/">
                        <span
                          style={{
                            color: "#020043",
                            cursor: "pointer",
                          }}
                          // onClick={handleLoginClick}
                        >
                          Sign In
                        </span>
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Registration;
