import React, { useState, useEffect } from "react";
import {
  Container,
  List,
  ListItem,
  Checkbox,
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { material_list as materialList } from "./material_list";
import { contract_list } from "./contract_list";
import { checkRefreshData } from "../../action/splash/splase_action";

const Material = ({ updatedMaterialList, setUpdatedMaterialList }) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [materialsToRender, setMaterialsToRender] = useState([]);
  const [contractResults, setContractResults] = useState([]);
  const [contractsToRender, setContractsToRender] = useState([]);
  const [changesSaved, setChangesSaved] = useState(false);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  const vendorType =
    user && user.VendorType ? user.VendorType : "DefaultVendorType";
  const isSupplier = vendorType === "Supplier";

  const handleCheckboxChange = (idRef, isContract) => {
    setSelectedItems((prevSelected) => {
      const updatedSelectedItems = {
        ...prevSelected,
        [idRef]: !prevSelected[idRef],
      };

      const updatedList = isContract
        ? contract_list.map((contract) => ({
            ...contract,
            isSelected:
              updatedSelectedItems[contract.ContractMasterId] || false,
          }))
        : materialList.map((material) => ({
            ...material,
            isSelected:
              updatedSelectedItems[material.MaterialSubTypeMasterId] || false,
          }));

      setUpdatedMaterialList(updatedList);

      localStorage.setItem("materialList", JSON.stringify(updatedList));
      localStorage.setItem(
        "selectedItems",
        JSON.stringify(updatedSelectedItems)
      );
      setChangesSaved(false);
      return updatedSelectedItems;
    });
  };

  const handleSearch = () => {
    setSearchResults([]);

    let filteredMaterials = materialList.filter(
      (material) =>
        material.MaterialName.toLowerCase().includes(search.toLowerCase()) ||
        material.MaterialSubTypeCode.toLowerCase().includes(
          search.toLowerCase()
        )
    );

    let filteredContracts = contract_list.filter((contractor) =>
      contractor.Contract.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredMaterials);
    setMaterialsToRender(search ? filteredMaterials : materialList);

    setContractResults(filteredContracts);
    setContractsToRender(search ? filteredContracts : contract_list);
  };

  useEffect(() => {
    const initialItems = isSupplier
      ? {}
      : JSON.parse(localStorage.getItem("selectedItems")) || {};
    setSelectedItems(initialItems);

    const storedMaterialList =
      JSON.parse(localStorage.getItem("materialList")) || materialList;
    setMaterialsToRender(search ? searchResults : storedMaterialList);

    const storedContractList =
      JSON.parse(localStorage.getItem("contractList")) || contract_list;
    setContractsToRender(search ? contractResults : storedContractList);
    checkRefreshData();
  }, [isSupplier, search, searchResults, contractResults]);

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <Container
      sx={{
        maxWidth: "800px",
        paddingX: "2rem",
        maxHeight: "100%",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        {isSupplier ? "Material List" : "Contractor List"}
      </Typography>

      <TextField
        label="Search Material or Contract"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ marginBottom: "1rem", width: "390px" }}
      />

      <List>
        {isSupplier ? (
          materialsToRender.length ? (
            materialsToRender.map((material) => (
              <ListItem
                key={`${material.MaterialMasterId}_${material.MaterialSubTypeMasterId}`}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {`${material.MaterialName} - ${material.MaterialSubTypeCode}`}
                <Checkbox
                  checked={
                    selectedItems[material.MaterialSubTypeMasterId] || false
                  }
                  onChange={() =>
                    handleCheckboxChange(
                      material.MaterialSubTypeMasterId,
                      false
                    )
                  }
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <Typography color="black">No Data</Typography>
            </ListItem>
          )
        ) : contractsToRender.length ? (
          contractsToRender.map((contractor) => (
            <ListItem
              key={contractor.ContractMasterId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {contractor.Contract}
              <Checkbox
                checked={selectedItems[contractor.ContractMasterId] || false}
                onChange={() =>
                  handleCheckboxChange(contractor.ContractMasterId, true)
                }
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <Typography color="black">No Data</Typography>
          </ListItem>
        )}
      </List>
    </Container>
  );
};

export default Material;
