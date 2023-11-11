import React from "react";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Alerts = () => {
  const alerts = useSelector((state) => state.alerts.messages);
  return (
    <div style={{ position: "fixed" }}>
      {alerts.map((alert, i) => (
        <Alert severity={alert.severity} key={i} sx={{ margin: "10px", zIndex: 1300, position: "fixed" }}>
          {alert.message}
        </Alert>
      ))}
    </div>
  );
};

export default Alerts;
