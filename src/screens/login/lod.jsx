import React, { useState } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import images from "../../utils/images/common/image_map";
import { loginApi, sendOTP, verifyOTP } from "../../action/home/home_action";
import { NavLink, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";

const Login = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [isPhoneCompleted, setIsPhoneCompleted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [existingPhoneNumber, setExistingPhoneNumber] = useState("");
  const [isDividerVisible, setIsDividerVisible] = useState(true);
  const [isSendOTPDisabled, setIsSendOTPDisabled] = useState(true);
  const [isVerifyOTPDisabled, setIsVerifyOTPDisabled] = useState(true);

  const handleEditPhoneNumber = () => {
    setIsEditingPhoneNumber(true);
    setExistingPhoneNumber(phoneNumber);
    setEnteredOtp("");
    setIsPhoneCompleted(false);
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(newPhoneNumber);

    setPhoneNumber(newPhoneNumber);

    if (formErrors.phoneNumber) {
      setFormErrors({ ...formErrors, phoneNumber: "" });
    }

    if (newPhoneNumber.length !== 10 || hasSpecialCharacters) {
      setFormErrors({
        ...formErrors,
        phoneNumber: "Invalid Phone Number! Please enter a 10-digit number without special characters.",
      });
      setIsSendOTPDisabled(true); // Disable Send OTP button
    } else {
      setFormErrors({ ...formErrors, phoneNumber: "" });
      setIsSendOTPDisabled(false); // Enable Send OTP button
    }
  };

  const handleEnteredOTPChange = (otp) => {
    setEnteredOtp(otp);

    if (formErrors.signIn) {
      setFormErrors({ ...formErrors, signIn: "" });
    }

    setIsVerifyOTPDisabled(otp.length !== 6); // Enable Verify OTP button if OTP is 6 digits
  };

  const generateOTP = async () => {
    if (phoneNumber.length !== 10) {
      setFormErrors({
        ...formErrors,
        phoneNumber: "Invalid Phone Number!",
        signIn: "", // Clear any previous sign-in error
      });
      return;
    }
  
    try {
      let otp = await sendOTP(phoneNumber);
  
      if (otp === "User not registered") {
        setFormErrors({
          ...formErrors,
          signIn: "User not registered. Please register first.",
        });
        return; // Do not proceed further if the user is not registered
      }
  
      setSentOtp(otp.toString());
      setIsPhoneCompleted(true);
      setFormErrors({
        ...formErrors,
        phoneNumber: "", // Clear any previous phone number error
        signIn: "", // Clear any previous sign-in error
      });
    } catch (error) {
      console.error("Error generating OTP:", error);
      setFormErrors({
        ...formErrors,
        signIn: "Error generating OTP. Please try again.",
      });
    }
  };
  

  const signInUser = async () => {
    if (verifyOTP(sentOtp, enteredOtp)) {
      try {
        var data = await loginApi(phoneNumber);
        console.log("data", data);
        if (data !== "") {
          setPhoneNumber("");
          setIsPhoneCompleted(false);
          setIsVerifyOTPDisabled(true); 
          navigate("/vendordashboard");
        } else {
          setFormErrors({
            ...formErrors,
            signIn: "Error signing in. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        setFormErrors({
          ...formErrors,
          signIn: "Error signing in. Please try again.",
        });
      }
    } else {
      setFormErrors({
        ...formErrors,
        signIn: "Invalid OTP. Please enter the correct OTP.",
      });
    }
  };
  
  return (
    <div>
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "white",
          margin: "auto",
          marginTop: "2rem",
          padding: "1rem",
        }}
      >
        <Typography
          sx={{
            color: "#020043",
            textAlign: "center",
            fontWeight: "600",
            fontSize: "19px",
            padding: "1rem",
          }}
        >
          LOGIN IN
          <img
            src={images.logo}
            alt="Vendor Logo"
            style={{
              width: "25px",
              height: "25px",
              marginLeft: "0.5rem",
            }}
          />
        </Typography>
        <form action="index.html" autoComplete="off">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={images.loginimg}
              style={{
                width: "140px",
                height: "140px",
                marginLeft: "1rem",
              }}
            />
            <Typography
              sx={{
                color: "gray",
                textAlign: "center",
                fontSize: "19px",
                marginTop: "5px",
              }}
            >
              Can we get your number ?
            </Typography>
            <Grid item xs={12} sx={{ marginTop: "5px" }}>
              <TextField
                label="Enter Phone Number"
                variant="outlined"
                fullWidth
                disabled={isPhoneCompleted}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                error={Boolean(formErrors.phoneNumber)} // Set error prop based on formErrors.phoneNumber
                helperText={formErrors.phoneNumber} // Display error message as helper text
                sx={{ marginBottom: "1rem", marginTop: "1rem" }}
              />
              {isPhoneCompleted && (
                <span
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "none",
                    float: "right",
                  }}
                  onClick={handleEditPhoneNumber}
                >
                  Change phone number ?
                </span>
              )}
              {isPhoneCompleted && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    marginTop: "2rem",
                  }}
                >
                  <OTPInput
                    value={enteredOtp}
                    onChange={handleEnteredOTPChange}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props, index) => (
                      <input
                        {...props}
                        style={{
                          width: "45px",
                          height: "45px",
                          textAlign: "center",
                          marginTop: "13px",
                        }}
                        maxLength="1"
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                      />
                    )}
                    isDisabled={isVerifyOTPDisabled} // Disable Verify OTP input if conditions are not met
                  />
                </Grid>
              )}
              <Button
                variant="contained"
                color={isPhoneCompleted ? "primary" : "primary"}
                onClick={() => {
                  if (isPhoneCompleted) {
                    signInUser();
                  } else {
                    generateOTP();
                  }
                  setIsDividerVisible(true);
                }}
                sx={{
                  marginTop: "1rem",
                  width: "100%",
                }}
                disabled={isSendOTPDisabled} // Disable Send OTP button if conditions are not met
              >
                {isPhoneCompleted ? "VERIFY OTP" : "Send OTP"}
              </Button>
              {formErrors.signIn && (
                <Typography
                  sx={{
                    color: "red",
                    textAlign: "center",
                    marginTop: "1rem",
                  }}
                >
                  {formErrors.signIn}
                </Typography>
              )}
              {isDividerVisible && (
                <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
              )}
              {isDividerVisible && (
                <Typography
                  sx={{
                    color: "gray",
                    textAlign: "center",
                    fontSize: "16px",
                    marginBottom: "1rem",
                  }}
                >
                  Not Registered Yet ?
                  <NavLink to="/register">
                    <span
                      style={{
                        cursor: "pointer",
                        color: "#020043",
                        marginLeft: "5px",
                      }}
                    >
                      Register Now
                    </span>
                  </NavLink>
                </Typography>
              )}
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Login;



