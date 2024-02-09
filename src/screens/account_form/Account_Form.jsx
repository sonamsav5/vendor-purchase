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
const accountTypes = ["Current", "Saving"];

const Account_Form = () => {
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

  const [bankList, setBankList] = useState([]);
  const [changesSaved, setChangesSaved] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    setAccountDetails((prevDetails) => ({
      ...prevDetails,
      AccountUrl: URL.createObjectURL(file),
    }));
  };

  const handleEditProfile = () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
    let temp = {
      ...user,
      ...accountDetails,
      AccountTypeId: accountDetails.AccountTypeId === "Saving" ? 1 : 2,
    };
    localStorage.setItem("user", JSON.stringify(temp));
    setChangesSaved(true);
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
    setChangesSaved(false); 
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: "1rem",
        border: "10px solid  #E0EEF7",
        padding: "2rem",
      }}
    >
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "20px",
          color: "#020043",
          textAlign: "center",
          padding: "1rem",
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
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Account Number"
            fullWidth
            name="AccountNumber"
            value={accountDetails.AccountNumber}
            onChange={handleChange}
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
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Account Type"
            fullWidth
            select
            name="AccountTypeId"
            value={accountDetails.AccountTypeId}
            onChange={handleChange}
          >
            {accountTypes.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Bank Address"
            fullWidth
            name="BankAddress"
            value={accountDetails.BankAddress}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Account Document"
            fullWidth
            name="AccountUrl"
            value={accountDetails.AccountUrl}
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
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditProfile}
            disabled={changesSaved}
            sx={{
              marginTop: "0.5rem",
              width: "160px",
              backgroundColor: "#020043",
              color: "#FFD500",
              padding: "5px 10px",
              borderRadius: "5px",
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
            {changesSaved ? "Saved" : "Save Changes"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account_Form;
