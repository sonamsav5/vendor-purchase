import React, { useEffect, useState } from "react";

import { Snackbar, Typography, Badge } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);

  const handleCloseSnackbar = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorSnackbarOpen(false);
  };

  const notificationTitle =
    newNotificationsCount > 0 ? "Latest Notification" : "Notifications";

  return (
    <div
      style={{
        border: "2px solid #F9F6EE",
        borderRadius: "5px",
      }}
    >
      <Typography
        sx={{
          fontWeight: "600",
          textAlign: "center",
          color: "white",
          backgroundColor: "#020043",
          padding: "0.7rem",
          borderRadius: "5px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {notificationTitle}
        <Badge
          color="error"
          badgeContent={newNotificationsCount}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          style={{
            position: "absolute",
            top: "50%",
            right: "50px",
            transform: "translateY(-50%)",
          }}
        >
          <NotificationsIcon />
        </Badge>
      </Typography>

      <div style={{ overflowY: "auto" }}>
        {notifications.length === 0 ? (
          <p>No notifications available</p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 6 }}>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "5px",
                  marginBottom: "12px",
                  borderRadius: "3px",
                }}
              >
                <Typography sx={{ fontSize: "13px", color: "#000000" }}>
                  {notification.Title}
                </Typography>
                <p
                  style={{
                    fontSize: "12px",
                    color: "gray",
                  }}
                >
                  {notification.Description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="error"
        >
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Notification;
