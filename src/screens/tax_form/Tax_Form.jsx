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
const Tax_Form = () => {
  // const navigate = useNavigate();

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
  // const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [changesSaved, setChangesSaved] = useState(false);

  const [selectedPancardFile, setSelectedPancardFile] = useState(null);
  const [selectedGstCertificateFile, setSelectedGstCertificateFile] =
    useState(null);
  const [uploading, setUploading] = useState(false);

  // Event handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaxFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    setChangesSaved(false); // Reset changesSaved when there is a change in the form

  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    setTaxFormDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: URL.createObjectURL(file),
    }));
  };
  useEffect(() => {
    console.log("useEffect triggered");
    const storedData = JSON.parse(localStorage.getItem("user")) || {};
    setTaxFormDetails((prevDetails) => ({
      ...prevDetails,
      ...storedData,
    }));
    checkRefreshData();
  }, []);

  const handleEditForm = () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
    let temp = {
      ...user,
      ...taxFormDetails,
    };
    localStorage.setItem("user", JSON.stringify(temp));
    setChangesSaved(true);

  };

  console.log("sggc", taxFormDetails);
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
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="GST Number"
            fullWidth
            name="GST"
            value={taxFormDetails.GST}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="CGST Number"
            fullWidth
            name="CGST"
            value={taxFormDetails.CGST}
            onChange={handleChange}
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
        <Grid item xs={12}>
          <TextField
            label="GST URL"
            fullWidth
            name="GSTUrl"
            value={taxFormDetails.GSTUrl}
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
        <Grid item xs={12}>
          <TextField
            label="Pan Card URL"
            fullWidth
            name="PanCardUrl"
            value={taxFormDetails.PanCardUrl}
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
        <Grid item xs={12}>
        <Button
        variant="contained"
        color="primary"
        onClick={handleEditForm}
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

export default Tax_Form;
