import axios from "axios";
import { postRequestWithoutAuthentication } from "../../service/base_client";

export const registerApi = async (payload) => {
  let url = `Authentication/AddUpdateVendorRegistrationPurchase`;
  var response = await postRequestWithoutAuthentication(url, payload);
  if (response.status) {
    console.log(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", JSON.stringify(response.data.Token));
    return response.data;
  } else {
    // Show Error Message
    return "";
  }
};

export const sendEmailOTP = async (emailID) => {
  let otp = generateRandomOTP();
  let url = `StaticData/SendEmail`;
  var payload = {
    toEmail: emailID,
    bccEmail: "",
    ccEmail: "",
    emailSubject: "H Rishabraj - REBUILD - OTP",
    emailBody:
      `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rebuild - OTP</title>
    </head>
    <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
            <h2 style="color: #007bff;">Rebuild - OTP</h2>
            <p>Your One-Time Password (OTP) for the Rebuild app is  <strong style="font-size: 18px;">` +
      otp +
      `</strong>.</p>
            <p>Please use this code to complete the verification process.</p>
            <p>Thank you,<br>H Rishabraj </p>
        </div>
    </body>
    </html>`,
  };
  var response = await postRequestWithoutAuthentication(url, payload);
  if (response.status) {
    return otp;
  } else {
    // Show Error Message
    return "";
  }
};

export const sendPhoneOTP = async (phoneNumber) => {
  let otp = generateRandomOTP();
  return otp;
};

const generateRandomOTP = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
