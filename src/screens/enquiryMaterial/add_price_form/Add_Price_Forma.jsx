// AddPriceDialog.js
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";

const Add_Price_Form = ({ open, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    rate: "",
    gst: "",
    selectSgst: "",
    igst: "",
    discount: "",
    total: "",
    cgst: "",
    sgst: "",
    // igst: "",
    ugst: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = () => {
    handleSave(formData);
    handleClose();
  };

  const handleGstChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (value === "CGST") {
      setFormData({ ...formData, cgst: "" });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Price</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="rate"
              label="Rate"
              value={formData.rate}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} lg={4}>
            <TextField
              select
              name="gst"
              label="Select GST"
              value={formData.gst}
              onChange={handleGstChange} 
              fullWidth
            >
              <MenuItem value="CGST">CGST</MenuItem>
              <MenuItem value="SGST">SGST</MenuItem>
              <MenuItem value="IGST">IGST</MenuItem>
              <MenuItem value="UGST">UGST</MenuItem>
            </TextField>
          </Grid>
          {formData.gst === "CGST" && (
            <Grid item xs={12} lg={4}>
              <TextField
                name="cgst"
                label="CGST"
                value={formData.cgst}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          )}
          <Grid item xs={12} lg={4}>
            <TextField
              select
              name="selectSgst"
              label="Select SGST"
              value={formData.selectSgst}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="SGST">SGST</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} lg={4}>
            <TextField
              name="sgst"
              label="SGST"
              value={formData.sgst}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="discount"
              label="Discount"
              value={formData.discount}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="total"
              label="Total"
              value={formData.total}
              onChange={handleChange}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveClick} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Add_Price_Form;
