import { Box, Checkbox, List, ListItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { material_list as materialList } from '../material/material_list'
import { contract_list } from '../material/contract_list'

const MyMaterials = () => {
  const [materialsToRender, setMaterialsToRender] = useState([])
  const [contractsToRender, setContractsToRender] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  const vendorType = user && user.VendorType ? user.VendorType : "DefaultVendorType";
  const isSupplier = vendorType === "Supplier";

  useEffect(() => {
    const initialItems = isSupplier
      ? {}
      : JSON.parse(localStorage.getItem("selectedItems")) || {};
    setSelectedItems(initialItems);

    const storedMaterialList =
      JSON.parse(localStorage.getItem("materialList")) || materialList;
    setMaterialsToRender(storedMaterialList);

    const storedContractList =
      JSON.parse(localStorage.getItem("contractList")) || contract_list;
    setContractsToRender(storedContractList);
  }, []);

  console.log(materialsToRender)
  console.log(isSupplier)

  return (
    <Box sx={{width: '100%', height: 'calc(100vh - 3rem)' }}>
      <Box>
        <Typography sx={{fontSize:25 , fontWeight:600,margin:1}}>
          {
            isSupplier ?
            "Material List"
            :
            "Contract List"
          }
        </Typography>
        <List>
          {
            isSupplier
              ? (
                materialsToRender?.length ?
                  materialsToRender.map((material,idx) => 
                  (
                    selectedItems[material.MaterialSubTypeMasterId] &&
                    <ListItem
                      key={idx}
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
                      />
                    </ListItem>
                  ))
                  :
                  <ListItem>
                    <Typography color='black'>No Data</Typography>
                  </ListItem>
              )
              : (
                contractsToRender.length ?
                  contractsToRender.map((contractor,idx) => (
                    selectedItems[contractor.ContractMasterId] &&
                    <ListItem
                      key={idx}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {contractor.Contract}
                      <Checkbox
                        checked={selectedItems[contractor.ContractMasterId] || false}
                      />
                    </ListItem>
                  ))
                  :
                  <ListItem>
                    <Typography color='black'>No Data</Typography>
                  </ListItem>
              )
          }
        </List>
      </Box>
    </Box>
  )
}

export default MyMaterials