import React, { usemicrNumber, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { getStaticData } from "../../action/form_action/form_actions";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { checkRefreshData } from "../../action/splash/splase_action";
import { accountState } from "../details/initialState";
const accountTypes = [
  {
    id: 1,
    label: "Current",
  },
  {
    id: 2,
    label: "Saving",
  },
];

const Account_Form = ({ accountDetails, setAccountDetails }) => {
  const [bankList, setBankList] = useState([]);
  const [changesSaved, setChangesSaved] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    setAccountDetails((prevDetails) => ({
      ...prevDetails,
      AccountUrl: URL.createObjectURL(file),
    }));
  };
  const [errors, setErrors] = useState({});
  const validateProfile = () => {
    const newErrors = {};
    let isValid = true;
    // Validate each field
    for (const key in accountDetails) {
      if (accountDetails[key] === "" && accountState[key] !== "") {
        newErrors[key] = "This field is required";
        isValid = false;
      }
    }
    setErrors(newErrors); // Update error state
    return isValid; // Return true if all fields are valid
  };

  useEffect(() => {
    var result = getStaticData();
    setBankList(result[2]);

    const storedData = JSON.parse(localStorage.getItem("user")) || {};
    setAccountDetails({
      AccountHolderName: storedData.AccountHolderName,
      AccountNumber: storedData.AccountNumber,
      BankId: storedData.BankId,
      BankAddress: storedData.BankAddress,
      IFSC: storedData.IFSC,
      AccountTypeId: storedData.AccountTypeId,
      MICR: storedData.MICR,
      AccountUrl: storedData.AccountUrl,
    });

    checkRefreshData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <Container
      sx={{
        maxWidth: "800px",
        paddingX: "2rem",
      }}
    >
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "20px",
          color: "#020043",
          textAlign: "left",
          paddingY: "1rem",
        }}
      >
        Account
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={6}>
          <TextField
            label="Account Holder"
            fullWidth
            name="AccountHolderName"
            value={accountDetails.AccountHolderName}
            onChange={handleChange}
            error={!!errors.AccountHolderName} // Set error state based on existence of error message
            helperText={errors.AccountHolderName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Account Number"
            fullWidth
            name="AccountNumber"
            value={accountDetails.AccountNumber}
            onChange={handleChange}
            error={!!errors.AccountNumber} // Set error state based on existence of error message
            helperText={errors.AccountNumber}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Bank Name"
            fullWidth
            name="BankId"
            select
            value={accountDetails.BankId}
            onChange={handleChange}
            error={!!errors.BankId} // Set error state based on existence of error message
            helperText={errors.BankId}
          >
            {bankList.map((option, index) => (
              <MenuItem key={index} value={option["BankNameId"]}>
                {option["BankOfName"]}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="IFSC Code"
            fullWidth
            name="IFSC"
            value={accountDetails.IFSC}
            onChange={handleChange}
            error={!!errors.IFSC} // Set error state based on existence of error message
            helperText={errors.IFSC}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Account Type"
            fullWidth
            select
            name="AccountTypeId"
            value={accountDetails.AccountTypeId || 1}
            onChange={handleChange}
            error={!!errors.AccountTypeId} // Set error state based on existence of error message
            helperText={errors.AccountTypeId}
          >
            {accountTypes.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="MICR Number"
            fullWidth
            name="MICR"
            value={accountDetails.MICR}
            onChange={handleChange}
            error={!!errors.MICR} // Set error state based on existence of error message
            helperText={errors.MICR}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Bank Address"
            fullWidth
            name="BankAddress"
            value={accountDetails.BankAddress}
            onChange={handleChange}
            error={!!errors.BankAddress} // Set error state based on existence of error message
            helperText={errors.BankAddress}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Account Document"
            fullWidth
            name="AccountUrl"
            value={accountDetails.AccountUrl}
            error={!!errors.AccountUrl} // Set error state based on existence of error message
            helperText={errors.AccountUrl}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton component="label" htmlFor="upload">
                    <CloudUploadIcon />
                    <input
                      type="file"
                      id="upload"
                      accept=".pdf, .doc, .docx"
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                    />
                  </IconButton>
                  {accountDetails.AccountUrl && (
                    <IconButton
                      onClick={() => window.open(accountDetails.AccountUrl)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account_Form;
