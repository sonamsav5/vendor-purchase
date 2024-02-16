import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { checkRefreshData } from "../../action/splash/splase_action";
import { taxState } from "../details/initialState";
const Tax_Form = ({ taxFormDetails, setTaxFormDetails }) => {
  // const navigate = useNavigate();

  // const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [changesSaved, setChangesSaved] = useState(false);

  const [selectedPancardFile, setSelectedPancardFile] = useState(null);
  const [selectedGstCertificateFile, setSelectedGstCertificateFile] =
    useState(null);
  const [uploading, setUploading] = useState(false);
// for error
const [errors, setErrors] = useState({});
const validateProfile = () => {
  const newErrors = {};
  let isValid = true;
  // Validate each field
  for (const key in taxFormDetails) {
    if (taxFormDetails[key] === "" && taxState[key] !== "") {
      newErrors[key] = "This field is required";
      isValid = false;
    }
  }
  setErrors(newErrors); // Update error state
  return isValid; // Return true if all fields are valid
};



const handleChange = (e) => {
  const { name, value } = e.target;
  setTaxFormDetails((prevDetails) => ({
    ...prevDetails,
    [name]: value,
  }));
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: "",
  }));
};

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    setTaxFormDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: URL.createObjectURL(file),
    }));
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user")) || {};
    setTaxFormDetails((prevDetails) => ({
      ...prevDetails,
      ...storedData,
    }));
    checkRefreshData();
  }, []);

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
        Tax
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
            label="PAN Number"
            fullWidth
            name="PanNumber"
            value={taxFormDetails.PanNumber}
            onChange={handleChange}
            error={!!errors.PanNumber} // Set error state based on existence of error message
            helperText={errors.PanNumber}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="GST Number"
            fullWidth
            name="GST"
            value={taxFormDetails.GST}
            onChange={handleChange}
            error={!!errors.CountryId} // Set error state based on existence of error message
            helperText={errors.CountryId}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="CGST Number"
            fullWidth
            name="CGST"
            value={taxFormDetails.CGST}
            onChange={handleChange}
            error={!!errors.CountryId} // Set error state based on existence of error message
            helperText={errors.CountryId}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="IGST Number"
            fullWidth
            name="IGST"
            value={taxFormDetails.IGST}
            onChange={handleChange}
            
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="SGST Number"
            fullWidth
            // select
            name="SGST"
            value={taxFormDetails.SGST}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="UTGST Number"
            fullWidth
            name="UTGST"
            value={taxFormDetails.UTGST}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="GST Document"
            fullWidth
            name="GSTUrl"
            value={taxFormDetails.GSTUrl}
            error={!!errors.GSTUrl} // Set error state based on existence of error message
            helperText={errors.GSTUrl}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton component="label" htmlFor="uploadGST">
                    <CloudUploadIcon />
                    <input
                      type="file"
                      id="uploadGST"
                      accept=".pdf, .doc, .docx"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileUpload(e, "GSTUrl")}
                    />
                  </IconButton>
                  {taxFormDetails.GSTUrl && (
                    <IconButton
                      onClick={() => window.open(taxFormDetails.GSTUrl)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Pan Card Document"
            fullWidth
            name="PanCardUrl"
            value={taxFormDetails.PanCardUrl}
            error={!!errors.PanCardUrl} // Set error state based on existence of error message
            helperText={errors.PanCardUrl}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton component="label" htmlFor="uploadPanCard">
                    <CloudUploadIcon />
                    <input
                      type="file"
                      id="uploadPanCard"
                      accept=".pdf, .doc, .docx"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileUpload(e, "PanCardUrl")}
                    />
                  </IconButton>
                  {taxFormDetails.PanCardUrl && (
                    <IconButton
                      onClick={() => window.open(taxFormDetails.PanCardUrl)}
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

export default Tax_Form;
