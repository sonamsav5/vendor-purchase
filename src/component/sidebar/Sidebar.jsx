import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, Avatar, Button, Stack } from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import images from "../../utils/images/common/image_map";

const Sidebar = ({ navbar, setNavbar, drawerWidth }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openSubMenu, setOpenSubMenu] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // const [photoUrl, setPhotoUrl] = useState(null);
  const [currPath, setCurrPath] = useState(location.pathname);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [role, setRole] = useState("");
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setNavbar(!navbar);
  };

  const handleSubMenuToggle = () => {
    setOpenSubMenu(!openSubMenu);
  };

  const roles = JSON.parse(localStorage.getItem("user")) || {};
  const userRole = roles.UserType || "";

  const dashboardLinks = {};

  const dashboardLink = dashboardLinks[userRole] || "/defaultDashboard";
  const [activeLink, setActiveLink] = React.useState(
    JSON.parse(localStorage.getItem("user"))?.UserType
      ? dashboardLinks[JSON.parse(localStorage.getItem("user")).UserType]
      : "/defaultDashboard"
  );

  const isLetterVisible = true;
  const LetterVisible = ["Channel Partner"].includes(userRole);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const handleAddLeadClick = () => {
    navigate("/leadforms");
  };
  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("user")) || {};
    setFirstName(storedUserDetails.VendorName || "");

    setRole(storedUserDetails.VendorType || "");
    setEmailId(storedUserDetails.EmailId || "");
  }, []);

  useEffect(() => {
    setCurrPath(location.pathname);
  }, [location.pathname]);

  console.log("activeLink", activeLink);
  console.log("location.pathname", location.pathname);
  const drawer = (
    <div>
      <Box sx={{ position: "relative" }}>
        <Avatar
          alt="Profile Photo"
          sx={{
            width: 90,
            height: 90,
            marginTop: "1.3rem",
            alignItems: "center",
            margin: "18px auto",
          }}
        />

        <label htmlFor="photo-upload">
          <input
            type="file"
            accept="image/*"
            id="photo-upload"
            style={{ display: "none" }}
          />
        </label>

        <div
          style={{
            padding: "3px",
            borderRadius: "5px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "15px",
              color: "white",
              textAlign: "center",
            }}
          >
            {`${firstName}  - ${role}`}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "white",
              textAlign: "center",
            }}
          >
            {emailId}
          </Typography>
        </div>
      </Box>

      <List
        sx={{
          marginTop: "1rem",
          "& .MuiListItem-root:hover": {
            //  backgroundColor: "white",
            color: "black",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
            borderTopLeftRadius: "5px",
          },
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/vendordashboard"
            sx={{
              backgroundColor:
                "/vendordashboard" === currPath ? "#4744b1" : "transparent",
              color: "/vendordashboard" === currPath ? "black" : "inherit",

              "&:hover": {
                backgroundColor: "#4744b1",
                color: "black",
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
                borderTopLeftRadius: "5px",
              },
            }}
            onClick={() => setActiveLink("/vendordashboard")}
          >
            <ListItemIcon
              sx={{
                color: activeLink === location.pathname ? "white" : "white",
              }}
            >
              <img
                src={images.dashboardImg}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              sx={{
                color: "yellow",
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/Details"
            sx={{
              backgroundColor:
                "/Details" === currPath ? "#4744b1" : "transparent",
              color: "/Details" === currPath ? "black" : "inherit",

              "&:hover": {
                backgroundColor: "#4744b1",
                color: "black",
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
                borderTopLeftRadius: "5px",
              },
            }}
            onClick={() => setActiveLink("/Details")}
          >
            <ListItemIcon
              sx={{
                color: "white",
              }}
            >
              <img
                src={images.profileImg}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Profile"
              sx={{
                color: "yellow",
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            sx={{
              backgroundColor:
                "" === location.pathname ? "#4744b1" : "transparent",
              color: "" === location.pathname ? "black" : "inherit",

              "&:hover": {
                backgroundColor: "#4744b1",
                color: "black",
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
                borderTopLeftRadius: "5px",
              },
            }}
            onClick={() => setActiveLink("/enquiryMaterial")}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <img
                src={images.cashPaymentImg}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="My Payments"
              sx={{
                color: "yellow",
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/my_material"
            sx={{
              backgroundColor:
                "/my_material" === location.pathname
                  ? "#4744b1"
                  : "transparent",
              color: "/my_material" === location.pathname ? "black" : "inherit",

              "&:hover": {
                backgroundColor: "#4744b1",
                color: "black",
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
                borderTopLeftRadius: "5px",
              },
            }}
            onClick={() => setActiveLink("/my_material")}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <img
                src={images.rawMaterialImg}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="My Material"
              sx={{
                color: "yellow",
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            sx={{
              "&:hover": {
                backgroundColor: "white",
                color: "black",
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
                borderTopLeftRadius: "5px",
              },
            }}
            onClick={() => setActiveLink("/vendordashboard")}
          >
            <ListItemIcon>
              <img
                src={images.complaintImg}
                alt="Your Image"
                style={{ width: "24px", height: "24px", marginRight: "8px" }}
              />
            </ListItemIcon>

            <ListItemText
              primary="Privacy Policy"
              sx={{
                color: "yellow",
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            sx={{
              "&:hover": {
                backgroundColor: "white",
                color: "black",
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
                borderTopLeftRadius: "5px",
              },
            }}
            onClick={() => setActiveLink("/vendordashboard")}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <img
                src={images.termsImg}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Terms & Condition"
              sx={{
                color: "yellow",
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            sx={{
              "&:hover": {
                backgroundColor: "white",
                color: "black",
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
                borderTopLeftRadius: "5px",
              },
            }}
            onClick={() => setActiveLink("/vendordashboard")}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <img
                src={images.moreImg}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="More"
              sx={{
                color: "yellow",
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              // marginTop: "3rem",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
                borderTopLeftRadius: "5px",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <img
                src={images.logOutImg}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{
                color: "yellow",
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#020043",
          height: "20px",
          padding: "none",
          boxShadow: "none",
          color: "black",
          height: "3rem",
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Stack height="100%" padding={1} justifyContent="center">
          <MenuIcon
            sx={{ color: "white", fontSize: 30, cursor: "pointer" }}
            onClick={handleDrawerToggle}
          />
        </Stack>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          display: navbar ? "block" : "none",
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: mobileOpen ? "block":"none",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#020043",
              color: "white",
              border: "none",
              boxShadow: " 0 10px 10px rgb(28,37,54)",
              border:'4px solid red'
            },
          }}
        >
          {drawer}
        </Drawer> */}
        <Drawer
          variant="permanent"
          sx={{
            display: navbar ? "block" : "none",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#020043",
              color: "white",
              border: "none",
              // borderTopRightRadius: "5px",
              boxShadow: " 0 20px 15px rgb(28,37,54)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;
