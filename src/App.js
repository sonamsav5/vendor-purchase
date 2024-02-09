import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Registration from "./screens/registration/Registration";
import Login from "./screens/login/Login";
import Vendor_Dashboard from "./screens/vendor_dashboard/Vendor_Dashboard";
import Details from "./screens/details/Details";
import { useEffect } from "react";
import { checkRefreshData } from "./action/splash/splase_action";
import ProtectedRoute from "./service/protected_route";
import DashBoard_Layout from "./component/Layouts/Dashboard_Layout";
import Enquiry_Material from "./screens/vendor_dashboard/component/Enquiry_Material";
import Material_Table from "./screens/vendor_dashboard/component/material_table/Material_Table";
import EnquiryMaterial from "./screens/enquiryMaterial/EnquiryMaterial";
import MaterialPricesTable from "./screens/enquiryMaterial/MaterialPricesTable";

function App() {
  useEffect(() => {
    checkRefreshData();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Login />} />

        <Route
          path="/vendordashboard"
          element={
            <ProtectedRoute
              children={<DashBoard_Layout children={<Vendor_Dashboard />} />}
            />
          }
        />
        <Route
          path="/Details"
          element={
            <ProtectedRoute
              children={<DashBoard_Layout children={<Details />} />}
            />
          }
        />
        <Route
        path="/materialList"
        element={
          <ProtectedRoute
            children={<DashBoard_Layout children={<EnquiryMaterial />} />}
          />
        }
      />
      <Route
      path="/materialPricesTable"
      element={
        <ProtectedRoute
          children={<DashBoard_Layout children={<MaterialPricesTable />} />}
        />
      }
    />
      
        <Route
          path="/enquiryMaterial"
          element={
            <ProtectedRoute
              children={<DashBoard_Layout children={<Enquiry_Material />} />}
            />
          }
        />
        <Route
          path="/materialtable"
          element={
            <ProtectedRoute
              children={<DashBoard_Layout children={<Material_Table />} />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
