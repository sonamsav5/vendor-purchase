import axios from "axios";
import { getRequestWithoutAuthentication } from "../../service/base_client";

export const sendOTP = async (phoneNumber) => {
  let otp = generateRandomOTP();
  // Send OTP
  // var response = await axios.get("");
  return otp;
};

export const verifyOTP = (sentOTP, enteredOTP) => {
  if (sentOTP == enteredOTP) {
    return true;
  }
  return false;
};

export const loginApi = async (phoneNumber) => {
  let url = `Authentication/IsValidateMobileNumberPurchase?mobileNumber=${phoneNumber}&deviceToken=WEB`;
  var response = await getRequestWithoutAuthentication(url);
  console.log("status", response.status);
  if (response.status) {
    console.log(response.data[0].Token);
    localStorage.setItem("user", JSON.stringify(response.data[0]));
    localStorage.setItem("token", JSON.stringify(response.data[0].Token));
    return response.data;
  } else {
    // Show Error Message
    return "";
  }
};

const generateRandomOTP = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
