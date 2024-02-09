import { postRequestWithAuthentication } from "../../service/base_client";

export const getStaticData = (payload) => {
  var result = [];

  result.push(JSON.parse(localStorage.getItem("countryStateCity")));
  result.push(JSON.parse(localStorage.getItem("uomMaster")));
  result.push(JSON.parse(localStorage.getItem("bankName")));
  result.push(JSON.parse(localStorage.getItem("materailData")));
  result.push(JSON.parse(localStorage.getItem("contractData")));
  //console.log("name", JSON.parse(localStorage.getItem("bankName")));

  return result;
};

export const getcountryStateCityList = (countryStateCity) => {
  // console.error("countryStateCity is null or undefined");
  const uniqueCountryIds = [];
  var result = [];

  countryStateCity?.forEach((item) => {
    if (!uniqueCountryIds.includes(item.CountryId)) {
      uniqueCountryIds.push(item.CountryId);
      result.push({
        id: item.CountryId,
        name: item.CountryName,
      });
    }
  });

  return result;
};

export const getStateList = (countryStateCity, countryId) => {
  // console.log("id", countryId)
  const filterStateList = countryStateCity?.filter(
    (item) => item.CountryId === countryId
  );
  //  console.log("vhhdvsasdv", filterStateList);
  const uniquStateIds = [];
  var result = [];
  filterStateList?.forEach((item) => {
    if (!uniquStateIds.includes(item.StateId)) {
      uniquStateIds.push(item.StateId);
      result.push({
        id: item.StateId,
        name: item.StateName,
      });
    }
    // console.log("gescsddfist", filterStateList);
  });

  return result;
};

//

//
export const getCityList = (countryStateCity, stateId) => {
  const filterCityList = countryStateCity?.filter(
    (item) => item.StateId === stateId
  );

  const uniqueCityIds = [];
  var result = [];

  filterCityList?.forEach((item) => {
    if (!uniqueCityIds.includes(item.CityId)) {
      uniqueCityIds.push(item.CityId);
      result.push({
        id: item.CityId,
        name: item.CityName,
      });
    }
  });

  return result;
};

const handleMaterialAction = async (flag) => {
  try {
    const response = await postRequestWithAuthentication(
      "Purchase/AddIndentMaterialCost",
      {
        IndentMaterialDetails: "string",
        IndentId: 0,
        Flag: flag,
      }
    );

    if (response.status === true) {
      return true;
    } else {
      console.error(
        `Error ${flag === "accept" ? "accepting" : "rejecting"} material:`,
        response.error
      );
      return false;
    }
  } catch (error) {
    console.error(
      `Network error while ${
        flag === "accept" ? "accepting" : "rejecting"
      } material:`,
      error
    );
    return false;
  }
};
