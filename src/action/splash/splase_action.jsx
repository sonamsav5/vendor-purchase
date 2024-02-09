import axios from "axios";
import {
  getRequestWithoutAuthentication,
  getStaticRequestWithoutAuthentication,
} from "../../service/base_client";

export const checkProfileStatus = () => {
  let token = localStorage.getItem("token");
  if (token == null) {
    return false;
  }
  return true;
};

export const checkRefreshData = async () => {
  let url = "StaticData/IsRefreshData";

  var response = await getRequestWithoutAuthentication(url);

  if (response != "" && response.data.length > 0) {
    var refreshData = localStorage.getItem("refreshCount");
    var data = response.data[0];

    const refreshCountPurchase = data.RefreshStaticDataCountPurchase;

    if (
      refreshData !== undefined &&
      refreshCountPurchase !== undefined &&
      refreshCountPurchase.toString() === refreshData
    ) {
      // Move ahead
    } else {
      // Call API
      localStorage.setItem("refreshCount", refreshCountPurchase);
      await getStaticData();
    }
  } else {
    // Show Error
  }
};

export const getStaticData = async () => {
  let url = "StaticData/PullStaticDataPurchase";
  // console.log("jsdjv", url);
  var response = await getRequestWithoutAuthentication(url);
  if (response != "") {
    localStorage.setItem(
      "countryStateCity",
      JSON.stringify(response.data["countryStateCityData"])
    );
    console.log("vwesvwsbvwb", response);
    localStorage.setItem(
      "uomMaster",
      JSON.stringify(response.data["uomMasterData"])
    );
    localStorage.setItem(
      "bankName",
      JSON.stringify(response.data["bankNameData"])
    );
    // console.log("fdasdfas", JSON.stringify(response.data["bankNameData"]));
    localStorage.setItem(
      "materailData",
      JSON.stringify(response.data["materialMasterData"])
    );
    localStorage.setItem(
      "contractData",
      JSON.stringify(response.data["contractMasterData"])
    );
  } else {
  }
};
