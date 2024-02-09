import axios from "axios";
import { Constant } from "../../utils/constant/constant";

export const submit_action = async () => {
  try {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};

    const formData = new FormData();

    for (const key in user) {
      formData.append(key, user[key]);
    }

    formData.append("DeviceToken", "WEB");

    const token = `Bearer ${JSON.parse(localStorage.getItem("token"))}`;

    const response = await axios.post(
      `${Constant.baseUrl}/Authentication/AddUpdateVendorRegistrationProfilePurchase`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
          apiKey: Constant.apiKey,
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (e) {
    console.error("Error", e);
  }
};
