import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import {
  getCityList,
  getStateList,
  getStaticData,
  getcountryStateCityList,
} from "../../action/form_action/form_actions";
import { checkRefreshData } from "../../action/splash/splase_action";

const Profile = ({ profileDetails, setProfileDetails }) => {
  const [countryStateCity, setCountryStateCity] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [changesSaved, setChangesSaved] = useState(false);

  const handleCountryChange = (event) => {
    const { name, value } = event.target;
    setProfileDetails({
      ...profileDetails,
      [name]: value,
    });
    setStateList(getStateList(countryStateCity, value));
  };
  // console.log("data", profileDetails);
  const handleStateChange = (event) => {
    const { name, value } = event.target;
    console.log("name--value", name, value);
    setProfileDetails({
      ...profileDetails,
      [name]: value,
    });
    //setCityList(getCityList(countryStateCity, value));
  };

  useEffect(() => {
    setCityList(getCityList(countryStateCity, profileDetails.StateId));
  }, [profileDetails.StateId]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user")) || {};

    // console.log(set);
    setProfileDetails({
      VendorName: storedData.VendorName || "",
      EmailId: storedData.EmailId || "",
      MobileNumber: storedData.MobileNumber || "",
      Address: storedData.Address || "",
      CountryId: storedData.CountryId || "",
      StateId: storedData.StateId || "",
      CityId: storedData.CityId || "",
    });
    var result = getStaticData();
    setCountryStateCity(result[0]);
    var tempCountryList = getcountryStateCityList(result[0]);
    console.log("tempCountryList", getcountryStateCityList(result[0]));
    setCountryList(tempCountryList);
    // console.log(":sdvhdsgbhhhv", setProfileDetails);
    // //
    var stateList = getStateList(
      result[0],
      profileDetails.CountryId || storedData.CountryId
    );
    setStateList(stateList);
    // console.log("sdvbsdvsdvsdv", stateList)

    //
    var tempCityList = getCityList(
      result[0],
      profileDetails.StateId || storedData.StateId
    );
    setCityList(tempCityList);

    // console.log("detai;ls", storedData);
    checkRefreshData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    /// console.log("Updating state:", { [name]: value });

    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    setChangesSaved(false); // Reset changesSaved when there is a change in the form
  };

  // svsv

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
        Personal Information
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="start"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={6}>
          <TextField
            label="Vendor Name"
            fullWidth
            name="VendorName"
            value={profileDetails.VendorName}
            onChange={handleChange}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email"
            fullWidth
            name="EmailId"
            value={profileDetails.EmailId}
            onChange={handleChange}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Phone"
            fullWidth
            name="MobileNumber"
            value={profileDetails.MobileNumber}
            onChange={handleChange}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Address"
            fullWidth
            name="Address"
            value={profileDetails.Address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Country"
            fullWidth
            select
            name="CountryId" // replace with country
            value={profileDetails.CountryId}
            onChange={handleCountryChange}
          >
            <MenuItem value="">Select Country</MenuItem>
            {countryList.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="State"
            fullWidth
            select
            name="StateId" //replace with state
            value={profileDetails.StateId}
            onChange={handleStateChange}
            // disabled={!profileDetails.StateId}
          >
            <MenuItem value="">Select State</MenuItem>
            {stateList.map((option, index) => (
              <MenuItem key={index} value={option["id"]}>
                {option["name"]}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="City"
            fullWidth
            select
            name="CityId"
            value={profileDetails.CityId}
            onChange={handleStateChange}
            // disabled={!profileDetails.StateId}
          >
            <MenuItem value="">Select City</MenuItem>
            {cityList.map((option, index) => (
              <MenuItem key={index} value={option["id"]}>
                {option["name"]}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
