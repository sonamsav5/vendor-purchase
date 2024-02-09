import * as React from "react";
import {
  Container,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material";
import Profile from "../profile/Profile";
import "../../css/common/common.css";
import Tax_Form from "../tax_form/Tax_Form";
import Account_Form from "../account_form/Account_Form";
import Material from "../material/Material";
import { submit_action } from "../../action/profile_form_action/profile_form_action";
import { checkRefreshData } from "../../action/splash/splase_action";
import { useEffect } from "react";

const Details = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSubmit = async () => {
    await submit_action();
  };
  useEffect(() => {
    checkRefreshData();
  }, []);
  return (
    <div
      style={{
        // marginTop: "10rem",
        padding: "1rem",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stepper
            className="custom-stepper"
            activeStep={activeStep}
            alternativeLabel
          >
            <Step>
              <StepLabel
                className="custom-stepper-label"
                sx={{
                  fontSize: "20px",

                  "& .MuiStepLabel-alternativeLabel": {
                    fontSize: "20px",
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
                    fontSize: "20px",
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
                    fontSize: "20px",
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
                    fontSize: "20px",
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
              <Profile />
            </div>
          )}
          {activeStep === 1 && (
            <div>
              <Tax_Form />
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <Account_Form />
            </div>
          )}
          {activeStep === 3 && (
            <div>
              <Material />
            </div>
          )}

          <div>
            <Button
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              color="error"
              // sx={{
              //   backgroundColor: "red",
              //   color: "white",
              // }}
            >
              Back
            </Button>
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
              {activeStep === 3 ? "Finish" : "Next"}
            </Button>
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
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
