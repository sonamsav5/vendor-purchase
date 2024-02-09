import axios from "axios";
import { Constant } from "../utils/constant/constant";

export const getRequestWithoutAuthentication = async (url) => {
  try {
    var response = await axios.get(`${Constant.baseUrl}/${url}`, {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        apiKey: Constant.apiKey,
      },
    });
    // console.log("dhchsh", response);
    return processResponse(response.data);
  } catch (e) {
    return responseFormat(false, e);
  }
};

export const postRequestWithoutAuthentication = async (url, payload) => {
  try {
    var response = await axios.post(`${Constant.baseUrl}/${url}`, payload, {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        apiKey: Constant.apiKey,
      },
    });
    console.log("this is requestdata", response.data);
    return processResponse(response.data);
  } catch (e) {
    return responseFormat(false, e);
  }
};

export const getRequestWithAuthentication = async (url) => {
  var token = JSON.parse(localStorage.getItem("token"));
  token = `Bearer ${token}`;
  console.log(token);
  try {
    var response = await axios.get(`${Constant.baseUrl}/${url}`, {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        apiKey: Constant.apiKey,
        Authorization: token,
      },
    });
    return processResponse(response.data);
  } catch (e) {
    return responseFormat(false, e);
  }
};

export const postRequestWithAuthentication = async (url, payload) => {
  var token = JSON.parse(localStorage.getItem("token"));
  token = `Bearer ${token}`;
  console.log(token);

  try {
    var response = await axios.post(`${Constant.baseUrl}/${url}`, payload, {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        apiKey: Constant.apiKey,
        Authorization: token,
      },
    });
    // console.log("token", token)
    console.log(response.data);
    return processResponse(response.data);
  } catch (e) {
    return responseFormat(false, e);
  }
};
export const deleteRequest = async (url) => {
  var token = JSON.parse(localStorage.getItem("token"));
  token = `Bearer ${token}`;
  console.log(token);
  try {
    var response = await axios.delete(`${Constant.baseUrl}/${url}`, {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        apiKey: Constant.apiKey,
        Authorization: token,
      },
    });
    console.log("regd", response);
    return processResponse(response.data);
  } catch (e) {
    return responseFormat(false, e);
  }
};

// for staticData referesh
export const getStaticRequestWithoutAuthentication = async (url) => {
  try {
    var response = await axios.get(`${Constant.baseUrl}/${url}`, {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        apiKey: Constant.apiKey,
      },
    });
    return processResponse(JSON.parse(response.data));
  } catch (e) {
    return responseFormat(false, e);
  }
};

const processResponse = (response) => {
  if (response.IsSuccess) {
    return responseFormat(true, response.Data);
    console.log("dasdas", response.Data);
  } else {
    if (response.ErrorMessage.length === 0) {
      return responseFormat(false, response.WarningMessage[0]);
    }
    return responseFormat(false, response.ErrorMessage[0]);
  }
};

const responseFormat = (status, data) => {
  var result = {
    status: status,
    data: data,
  };
  return result;
};
