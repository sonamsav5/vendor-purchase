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

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({
    VendorName: "",
    EmailId: "",
    MobileNumber: "",
    Address: "",
    CountryId: "", //country
    StateId: "", //state
    CityId: "", //city
  });
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
  console.log("data", profileDetails);
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

    setCountryList(tempCountryList);
    console.log(":sdvhdsgbhhhv", setProfileDetails);
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
    console.log("Updating state:", { [name]: value });

    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    setChangesSaved(false); // Reset changesSaved when there is a change in the form
  };

  // svsv
  const handleEditProfile = () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
    let temp = {
      ...user,
      ...profileDetails,
      // AccountTypeId: accountDetails.AccountTypeId === "Saving" ? 1 : 2,
    };
    localStorage.setItem("user", JSON.stringify(temp));
    // console.log("scbhhsdv", temp)
    setChangesSaved(true);
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
        Profile
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
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email"
            fullWidth
            name="EmailId"
            value={profileDetails.EmailId}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Phone"
            fullWidth
            name="MobileNumber"
            value={profileDetails.MobileNumber}
            onChange={handleChange}
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

        {console.log("sdbhsdv", cityList)}
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

export default Profile;
