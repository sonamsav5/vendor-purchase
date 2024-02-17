import React, { useState } from "react";

import { Box, Stack } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";

const drawerWidth = 250;

const DashBoard_Layout = ({ children, role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [navbar, setNavbar] = useState(false)
  return (
    <div style={{ width: "100%" }}>
      <Sidebar
        Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        role={role}
        navbar={navbar}
        setNavbar={setNavbar}
        drawerWidth={drawerWidth}
      />
      <Stack
        flex={1}
        ml={{ md:`${drawerWidth}px`, xs: 0 }}
        overflow="hidden"
      >
        <Box maxWidth="100%" width="100%" marginTop='3rem'>
          {children}
        </Box>
      </Stack>
    </div>
  );
};

export default DashBoard_Layout;
