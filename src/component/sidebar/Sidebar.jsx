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
import Toolbar from "@mui/material/Toolbar";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Typography, Avatar, Button } from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import images from "../../utils/images/common/image_map";

const drawerWidth = 280;

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openSubMenu, setOpenSubMenu] = React.useState(false);
  const navigate = useNavigate();

  // const [photoUrl, setPhotoUrl] = useState(null);
  // const [isPhotoAdded, setIsPhotoAdded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [role, setRole] = useState("");
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubMenuToggle = () => {
    setOpenSubMenu(!openSubMenu);
  };

  const handleListItemClick = (link) => {
    setActiveLink(link);
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
  const drawer = (
    <div>
      <Box>
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
            backgroundColor: "white",
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
                activeLink === dashboardLink ? "#4744b1" : "transparent",
              color: activeLink === dashboardLink ? "black" : "inherit",

              "&:hover": {
                backgroundColor: "white",
                color: "black",
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
                borderTopLeftRadius: "5px",
              },
            }}
            onClick={() => handleListItemClick(dashboardLink)}
          >
            <ListItemIcon
              sx={{
                color: activeLink === dashboardLink ? "white" : "white",
              }}
            >
              <SpaceDashboardOutlinedIcon />
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
          <ListItemButton component={Link} to="/Details">
            <ListItemIcon
              sx={{
                color: "white",
              }}
            >
              <DraftsOutlinedIcon />
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
              <LogoutOutlinedIcon />
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
            sx={{
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
              <LogoutOutlinedIcon />
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
          >
            <ListItemIcon>
              <img
                src={images.logo}
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
          >
            <ListItemIcon sx={{ color: "white" }}>
              <LogoutOutlinedIcon />
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
          >
            <ListItemIcon sx={{ color: "white" }}>
              <LogoutOutlinedIcon />
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
              <LogoutOutlinedIcon />
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
          backgroundColor: "white",
          height: "20px",
          padding: "none",
          boxShadow: "none",
          color: "black",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ padding: "0px", mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#020043",
              color: "white",
              border: "none",
              boxShadow: " 0 10px 10px rgb(28,37,54)",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#020043",
              color: "white",
              border: "none",
              borderTopRightRadius: "5px",
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
