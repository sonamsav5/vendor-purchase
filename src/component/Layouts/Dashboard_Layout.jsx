import React, { useState } from "react";

import { Box, Stack } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";

const DashBoard_Layout = ({ children, role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div style={{ width: "100%" }}>
      <Sidebar
        Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        role={role}
      />
      <Stack
        flex={1}
        ml={isSidebarOpen ? { md: "330px", xs: 0 } : { md: "70px", xs: 0 }}
        overflow="hidden"
      >
        <Box maxWidth="100%" width="100%">
          {children}
        </Box>
      </Stack>
    </div>
  );
};

export default DashBoard_Layout;
